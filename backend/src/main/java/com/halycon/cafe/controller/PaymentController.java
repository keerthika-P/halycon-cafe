package com.halycon.cafe.controller;

import com.halycon.cafe.dto.OrderDtos.*;
import com.halycon.cafe.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/razorpay/create/{orderId}")
    public RazorpayOrderResponse createOrder(@PathVariable Long orderId) throws Exception {
        return paymentService.createRazorpayOrder(orderId);
    }

    @PostMapping("/razorpay/verify")
    public boolean verify(@RequestBody VerifyPaymentRequest req) throws Exception {
        return paymentService.verifyAndCompletePayment(req);
    }
}
