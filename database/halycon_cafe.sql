-- ============================================================
-- HALYCON CAFE — DATABASE SCHEMA + SEED DATA
-- Dark Luxury Cafe Ordering System
-- ============================================================

CREATE DATABASE IF NOT EXISTS halycon_cafe;
USE halycon_cafe;

-- ---------------- USERS ----------------
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('CUSTOMER','ADMIN') DEFAULT 'CUSTOMER',
    loyalty_points INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ---------------- CATEGORIES ----------------
CREATE TABLE categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(80) NOT NULL UNIQUE,
    slug VARCHAR(80) NOT NULL UNIQUE,
    theme_color VARCHAR(20),
    description VARCHAR(255),
    display_order INT DEFAULT 0
);

-- ---------------- MENU ITEMS ----------------
CREATE TABLE menu (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    category_id BIGINT NOT NULL,
    name VARCHAR(120) NOT NULL,
    description VARCHAR(500),
    ingredients VARCHAR(500),
    price DECIMAL(8,2) NOT NULL,
    calories INT,
    rating DECIMAL(2,1) DEFAULT 4.5,
    image_url VARCHAR(255),
    is_veg BOOLEAN DEFAULT TRUE,
    is_trending BOOLEAN DEFAULT FALSE,
    is_chef_special BOOLEAN DEFAULT FALSE,
    is_popular BOOLEAN DEFAULT FALSE,
    is_available BOOLEAN DEFAULT TRUE,
    order_count INT DEFAULT 0,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- ---------------- CART ----------------
CREATE TABLE cart_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    menu_item_id BIGINT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (menu_item_id) REFERENCES menu(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_item (user_id, menu_item_id)
);

-- ---------------- ORDERS ----------------
CREATE TABLE orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('PLACED','PREPARING','PACKED','OUT_FOR_DELIVERY','DELIVERED','CANCELLED') DEFAULT 'PLACED',
    delivery_address VARCHAR(500),
    delivery_phone VARCHAR(20),
    payment_method ENUM('RAZORPAY','UPI_QR','COD') DEFAULT 'RAZORPAY',
    payment_status ENUM('PENDING','SUCCESS','FAILED') DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ---------------- ORDER ITEMS ----------------
CREATE TABLE order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    menu_item_id BIGINT NOT NULL,
    item_name VARCHAR(120) NOT NULL,
    quantity INT NOT NULL,
    price_at_order DECIMAL(8,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (menu_item_id) REFERENCES menu(id)
);

-- ---------------- PAYMENTS ----------------
CREATE TABLE payments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    razorpay_order_id VARCHAR(120),
    razorpay_payment_id VARCHAR(120),
    razorpay_signature VARCHAR(255),
    amount DECIMAL(10,2) NOT NULL,
    status ENUM('CREATED','SUCCESS','FAILED') DEFAULT 'CREATED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- ---------------- LIKES ----------------
CREATE TABLE likes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    menu_item_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (menu_item_id) REFERENCES menu(id) ON DELETE CASCADE,
    UNIQUE KEY unique_like (user_id, menu_item_id)
);

-- ---------------- REVIEWS ----------------
CREATE TABLE reviews (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    menu_item_id BIGINT NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (menu_item_id) REFERENCES menu(id) ON DELETE CASCADE
);

-- ============================================================
-- SEED DATA — CATEGORIES
-- ============================================================
INSERT INTO categories (name, slug, theme_color, description, display_order) VALUES
('Fresh Juices', 'juices', '#22C55E', 'Neon green cold-pressed juice bar', 1),
('Milk Specials', 'milk', '#F5E6C8', 'Cream-glow milk beverages', 2),
('Coffee & Tea', 'coffee-tea', '#8B5A2B', 'Dark brown steam & warmth', 3),
('Snacks', 'snacks', '#F97316', 'Golden crispy warm bites', 4),
('Evening Snacks', 'evening-snacks', '#D4AF37', 'Street neon night bites', 5),
('Mojitos', 'mojitos', '#3B82F6', 'Blue neon liquid refreshers', 6),
('Signature Specials', 'signature', '#D4AF37', 'Gold luxury chef specials', 7);

-- ============================================================
-- SEED DATA — MENU ITEMS
-- ============================================================

-- Fresh Juices (category_id = 1)
INSERT INTO menu (category_id, name, description, ingredients, price, calories, rating, image_url, is_trending, is_popular) VALUES
(1,'Apple Juice','Cold-pressed apple juice served over ice with a neon green glow.','Fresh apples, ice, mint','89',120,4.6,'/images/apple-juice.jpg',0,1),
(1,'Pomegranate Juice','Ruby-red pomegranate pressed fresh, antioxidant rich.','Pomegranate, ice','109',110,4.7,'/images/pomegranate-juice.jpg',1,0),
(1,'Lemon Juice','Zesty fresh lemon juice with a hint of mint.','Lemon, sugar, mint, soda','69',60,4.3,'/images/lemon-juice.jpg',0,0),
(1,'ABC Juice','Apple, Beetroot & Carrot — the classic health blend.','Apple, beetroot, carrot','99',140,4.5,'/images/abc-juice.jpg',1,1),
(1,'Watermelon Juice','Chilled watermelon juice, light and refreshing.','Watermelon, mint, ice','79',90,4.4,'/images/watermelon-juice.jpg',0,0),
(1,'Grape Juice','Deep purple grape juice, cold-pressed.','Grapes, ice','89',100,4.2,'/images/grape-juice.jpg',0,0),
(1,'Mixed Fruit Juice','A vibrant blend of seasonal fruits.','Seasonal fruit mix, ice','109',150,4.6,'/images/mixed-fruit-juice.jpg',1,1);

-- Milk Specials (category_id = 2)
INSERT INTO menu (category_id, name, description, ingredients, price, calories, rating, image_url, is_popular) VALUES
(2,'Rose Milk','Chilled rose-flavoured milk with a cream glow finish.','Milk, rose syrup, ice','79',180,4.5,'/images/rose-milk.jpg',1),
(2,'Badam Milk','Rich almond milk topped with floating almond flakes.','Milk, almond, cardamom, sugar','99',220,4.7,'/images/badam-milk.jpg',1),
(2,'Chocolate Milk','Creamy chocolate milk, kids and adults favourite.','Milk, chocolate syrup','89',210,4.6,'/images/chocolate-milk.jpg',0),
(2,'Signature Milkshake','Thick milkshake in a rotating seasonal flavour.','Milk, ice cream, flavour syrup','129',350,4.8,'/images/signature-milkshake.jpg',1);

-- Coffee & Tea (category_id = 3)
INSERT INTO menu (category_id, name, description, ingredients, price, calories, rating, image_url, is_popular) VALUES
(3,'Tea','Classic Indian masala chai, brewed strong.','Tea leaves, milk, spices','29',40,4.4,'/images/tea.jpg',1),
(3,'Coffee','South Indian filter-style coffee.','Coffee, milk, chicory','39',50,4.5,'/images/coffee.jpg',0),
(3,'Filter Coffee','Traditional decoction coffee served in davara-tumbler.','Filter decoction, milk','49',55,4.8,'/images/filter-coffee.jpg',1),
(3,'Black Coffee','Bold, sugar-free black coffee.','Coffee decoction, hot water','35',10,4.2,'/images/black-coffee.jpg',0),
(3,'Boost','Malted energy drink, hot or cold.','Boost malt, milk','45',150,4.0,'/images/boost.jpg',0),
(3,'Horlicks','Classic malted health drink.','Horlicks malt, milk','45',160,4.0,'/images/horlicks.jpg',0);

-- Snacks (category_id = 4)
INSERT INTO menu (category_id, name, description, ingredients, price, calories, rating, image_url, is_veg, is_trending) VALUES
(4,'Chicken Nuggets','Golden crispy chicken nuggets with dip.','Chicken, breadcrumbs, spices','149',320,4.6,'/images/chicken-nuggets.jpg',0,1),
(4,'Rolls','Stuffed rolls wrapped fresh to order.','Wheat wrap, filling, sauces','79',280,4.3,'/images/rolls.jpg',1,0),
(4,'Sandwiches','Grilled sandwich with a golden crisp crust.','Bread, veggies/paneer, cheese','89',300,4.4,'/images/sandwiches.jpg',1,1),
(4,'Bread Omelette','Pan-fried bread with spiced egg omelette.','Bread, egg, onion, spices','59',260,4.5,'/images/bread-omelette.jpg',0,0),
(4,'Fries','Crispy golden French fries, seasoned.','Potato, salt, seasoning','69',280,4.4,'/images/fries.jpg',1,1);

-- Evening Snacks (category_id = 5)
INSERT INTO menu (category_id, name, description, ingredients, price, calories, rating, image_url) VALUES
(5,'Thattu Vadai','Crispy flattened lentil vadai, street-style.','Lentils, spices, oil','25',180,4.5,'/images/thattu-vadai.jpg'),
(5,'Norukal','Traditional crunchy evening snack mix.','Rice flour, spices, oil','20',150,4.2,'/images/norukal.jpg'),
(5,'Karam Snacks','Spicy roasted savoury mix.','Gram flour, spices','30',170,4.3,'/images/karam-snacks.jpg');

-- Mojitos (category_id = 6)
INSERT INTO menu (category_id, name, description, ingredients, price, calories, rating, image_url, is_trending) VALUES
(6,'Classic Mojito','Lime, mint and soda over crushed ice.','Lime, mint, soda, ice','99',80,4.5,'/images/classic-mojito.jpg',1),
(6,'Mint Mojito','Extra minty refresher with a cooling finish.','Mint, lime, soda','99',80,4.4,'/images/mint-mojito.jpg',0),
(6,'Blue Lagoon','Electric blue neon mojito, our signature colour.','Blue curacao syrup, lime, soda','119',90,4.7,'/images/blue-lagoon.jpg',1),
(6,'Watermelon Mojito','Watermelon muddled with mint and lime.','Watermelon, mint, lime, soda','109',95,4.5,'/images/watermelon-mojito.jpg',0);

-- Signature Specials (category_id = 7)
INSERT INTO menu (category_id, name, description, ingredients, price, calories, rating, image_url, is_chef_special) VALUES
(7,'Chef Special Juice','A rotating chef-curated seasonal juice blend.','Seasonal fruits, secret blend','139',160,4.9,'/images/chef-special-juice.jpg',1),
(7,'Halycon Signature Coffee','Our house-blend coffee with a gold-dust finish.','Signature roast, milk, gold dust garnish','129',180,4.9,'/images/halycon-signature-coffee.jpg',1),
(7,'Student Combo','Juice + snack combo priced for students.','Choice of juice + snack','129',400,4.6,'/images/student-combo.jpg',0),
(7,'Couple Combo','Two beverages + a shared snack platter.','2 beverages + snack platter','249',650,4.7,'/images/couple-combo.jpg',0);

-- ============================================================
-- Sample admin user (password: Admin@123 — BCrypt hash below is a placeholder,
-- regenerate with your own BCrypt encoder before using in production)
-- ============================================================
INSERT INTO users (name, email, phone, password_hash, role) VALUES
('Halycon Admin', 'admin@halyconcafe.in', '9999999999', '$2a$10$7EqJtq98hPqEX7fNZaFWoOhi5L5D8Wk4rDzVFvV.rF9mHfxG.T3Bq', 'ADMIN');
