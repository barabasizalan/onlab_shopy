INSERT INTO Category (Name)
VALUES 
    ('Fashion'),
    ('Sports and Hobby'),
    ('Smart gadgets'),
    ('Smartphones, tablets, laptops'),
    ('Household appliances'),
    ('TV and entertainment'),
    ('IT'),
    ('Photo-Video'),
    ('Garden'),
    ('Beauty care'),
    ('Books');

    -- Inserting products for the 'Fashion' category
INSERT INTO Product (Name, Description, Price, Quantity, CategoryId, Vat, UserId, ImageUrl)
VALUES 
    ('Mens Casual Shirt', 'Comfortable and stylish shirt for men', 29.99, 50, 1, 19, NULL, NULL),
    ('Womens Sneakers', 'Trendy sneakers for women', 39.99, 30, 1, 19, NULL, NULL),
    ('Leather Belt', 'High-quality leather belt for both men and women', 19.99, 40, 1, 19, NULL, NULL);

-- Inserting products for the 'Sports and Hobby' category
INSERT INTO Product (Name, Description, Price, Quantity, CategoryId, Vat, UserId, ImageUrl)
VALUES 
    ('Yoga Mat', 'Non-slip yoga mat for yoga enthusiasts', 24.99, 20, 2, 19, NULL, NULL),
    ('Table Tennis Set', 'Table tennis set with paddles and balls', 49.99, 15, 2, 19, NULL, NULL),
    ('Fishing Rod', 'Durable fishing rod for fishing enthusiasts', 34.99, 25, 2, 19, NULL, NULL);

-- Inserting products for the 'Smart gadgets' category
INSERT INTO Product (Name, Description, Price, Quantity, CategoryId, Vat, UserId, ImageUrl)
VALUES 
    ('Smart Watch', 'Multi-functional smartwatch with fitness tracking', 129.99, 10, 3, 19, NULL, NULL),
    ('Wireless Earbuds', 'High-quality wireless earbuds for music lovers', 79.99, 15, 3, 19, NULL, NULL),
    ('Bluetooth Speaker', 'Portable Bluetooth speaker with rich sound quality', 59.99, 20, 3, 19, NULL, NULL);

-- Inserting products for the 'Smartphones, tablets, laptops' category
INSERT INTO Product (Name, Description, Price, Quantity, CategoryId, Vat, UserId, ImageUrl)
VALUES 
    ('Smartphone - XYZ Model', 'Latest smartphone with high-resolution camera', 699.99, 8, 4, 19, NULL, NULL),
    ('Tablet - ABC Model', 'Sleek and lightweight tablet for on-the-go use', 399.99, 12, 4, 19, NULL, NULL),
    ('Laptop - 123 Model', 'Powerful laptop with fast processing speed', 999.99, 6, 4, 19, NULL, NULL);

-- Inserting products for the 'Household appliances' category
INSERT INTO Product (Name, Description, Price, Quantity, CategoryId, Vat, UserId, ImageUrl)
VALUES 
    ('Coffee Maker', 'Automatic coffee maker with programmable settings', 49.99, 20, 5, 19, NULL, NULL),
    ('Vacuum Cleaner', 'Efficient vacuum cleaner for hassle-free cleaning', 129.99, 15, 5, 19, NULL, NULL),
    ('Toaster', 'Stainless steel toaster with multiple toasting options', 29.99, 25, 5, 19, NULL, NULL);

-- Inserting products for the 'TV and entertainment' category
INSERT INTO Product (Name, Description, Price, Quantity, CategoryId, Vat, UserId, ImageUrl)
VALUES 
    ('Smart TV - 50" 4K', 'Ultra-HD smart TV with built-in streaming apps', 699.99, 10, 6, 19, NULL, NULL),
    ('Gaming Console - XYZ Model', 'Next-gen gaming console with immersive graphics', 399.99, 8, 6, 19, NULL, NULL),
    ('DVD Player', 'Compact DVD player with USB playback support', 49.99, 12, 6, 19, NULL, NULL);

-- Inserting products for the 'IT' category
INSERT INTO Product (Name, Description, Price, Quantity, CategoryId, Vat, UserId, ImageUrl)
VALUES 
    ('External Hard Drive - 1TB', 'Portable external hard drive for data backup', 59.99, 15, 7, 19, NULL, NULL),
    ('Wireless Keyboard and Mouse Combo', 'Ergonomic keyboard and mouse set for comfortable typing', 39.99, 20, 7, 19, NULL, NULL),
    ('USB Flash Drive - 64GB', 'Compact USB flash drive for storing and transferring files', 19.99, 25, 7, 19, NULL, NULL);

-- Inserting products for the 'Photo-Video' category
INSERT INTO Product (Name, Description, Price, Quantity, CategoryId, Vat, UserId, ImageUrl)
VALUES 
    ('Digital Camera - DSLR', 'Professional DSLR camera for high-quality photography', 899.99, 8, 8, 19, NULL, NULL),
    ('Tripod Stand', 'Adjustable tripod stand for stable camera support', 49.99, 12, 8, 19, NULL, NULL),
    ('Camera Bag', 'Durable camera bag for carrying camera equipment', 29.99, 15, 8, 19, NULL, NULL);

-- Inserting products for the 'Garden' category
INSERT INTO Product (Name, Description, Price, Quantity, CategoryId, Vat, UserId, ImageUrl)
VALUES 
    ('Garden Hose', 'Heavy-duty garden hose for watering plants', 19.99, 20, 9, 19, NULL, NULL),
    ('Pruning Shears', 'Sharp pruning shears for trimming bushes and shrubs', 14.99, 25, 9, 19, NULL, NULL),
    ('Outdoor Solar Lights', 'Energy-efficient solar lights for illuminating the garden', 29.99, 15, 9, 19, NULL, NULL);

-- Inserting products for the 'Beauty care' category
INSERT INTO Product (Name, Description, Price, Quantity, CategoryId, Vat, UserId, ImageUrl)
VALUES 
    ('Facial Cleanser', 'Gentle facial cleanser for removing dirt and impurities', 9.99, 30, 10, 19, NULL, NULL),
    ('Hair Dryer', 'Ionic hair dryer for quick drying and frizz-free hair', 39.99, 20, 10, 19, NULL, NULL),
    ('Makeup Brushes Set', 'High-quality makeup brushes set for flawless makeup application',    29.99, 25, 10, 19, NULL, NULL);

-- Inserting products for the 'Books' category
INSERT INTO Product (Name, Description, Price, Quantity, CategoryId, Vat, UserId, ImageUrl)
VALUES 
    ('Fiction Novel - XYZ', 'Bestselling fiction novel by a renowned author', 14.99, 50, 11, 19, NULL, NULL),
    ('Cookbook - Healthy Recipes', 'Collection of healthy recipes for cooking enthusiasts', 19.99, 40, 11, 19, NULL, NULL),
    ('Self-Help Book - Motivation', 'Self-help book to boost motivation and personal growth', 12.99, 35, 11, 19, NULL, NULL);

