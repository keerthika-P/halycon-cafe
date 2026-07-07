package com.halycon.cafe.service;

import com.halycon.cafe.dto.OrderDtos.*;
import com.halycon.cafe.model.Order;
import com.halycon.cafe.model.Payment;
import com.halycon.cafe.repository.OrderRepository;
import com.halycon.cafe.repository.PaymentRepository;
import com.razorpay.RazorpayClient;
import com.razorpay.Utils;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final RazorpayClient razorpayClient;
    private final OrderRepository orderRepository;
    private final PaymentRepository paymentRepository;

    @Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String keySecret;

    @Transactional
    public RazorpayOrderResponse createRazorpayOrder(Long localOrderId) throws Exception {
        Order order = orderRepository.findById(localOrderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found"));

        JSONObject options = new JSONObject();
        // Razorpay expects amount in the smallest currency unit (paise for INR)
        options.put("amount", order.getTotalAmount().multiply(java.math.BigDecimal.valueOf(100)).intValue());
        options.put("currency", "INR");
        options.put("receipt", "halycon_order_" + order.getId());

        com.razorpay.Order rzpOrder = razorpayClient.orders.create(options);

        Payment payment = Payment.builder()
                .order(order)
                .razorpayOrderId(rzpOrder.get("id"))
                .amount(order.getTotalAmount())
                .status(Payment.Status.CREATED)
                .build();
        paymentRepository.save(payment);

        return RazorpayOrderResponse.builder()
                .razorpayOrderId(rzpOrder.get("id"))
                .razorpayKeyId(keyId)
                .amount(order.getTotalAmount())
                .currency("INR")
                .localOrderId(order.getId())
                .build();
    }

    @Transactional
    public boolean verifyAndCompletePayment(VerifyPaymentRequest req) throws Exception {
        JSONObject attributes = new JSONObject();
        attributes.put("razorpay_order_id", req.getRazorpayOrderId());
        attributes.put("razorpay_payment_id", req.getRazorpayPaymentId());
        attributes.put("razorpay_signature", req.getRazorpaySignature());

        boolean isValid = Utils.verifyPaymentSignature(attributes, keySecret);

        Payment payment = paymentRepository.findByRazorpayOrderId(req.getRazorpayOrderId())
                .orElseThrow(() -> new IllegalArgumentException("Payment record not found"));

        Order order = orderRepository.findById(req.getOrderId())
                .orElseThrow(() -> new IllegalArgumentException("Order not found"));

        if (isValid) {
            payment.setRazorpayPaymentId(req.getRazorpayPaymentId());
            payment.setRazorpaySignature(req.getRazorpaySignature());
            payment.setStatus(Payment.Status.SUCCESS);
            order.setPaymentStatus(Order.PaymentStatus.SUCCESS);
        } else {
            payment.setStatus(Payment.Status.FAILED);
            order.setPaymentStatus(Order.PaymentStatus.FAILED);
        }
        paymentRepository.save(payment);
        orderRepository.save(order);
        return isValid;
    }
}
