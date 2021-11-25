
INSERT INTO users (name, email) VALUES
('Jerry Seinfeld',            'jerry@seinfeld.com'),
('George Costanza',           'george@seinfeld.com'),
('Cosmo Kramer',              'kramer@seinfeld.com'),
('Elaine Benes',              'elaine@seinfeld.com'),
('Ronald "Mac" McDonald',     'mac@sunny.com'),
('Charlie Kelly',             'charlie@sunny.com'),
('Dennis Reynolds',           'dennis@sunny.com'),
('Deeandra Reynolds',         'dee@sunny.com'),
('Frank Reynolds',            'frank@sunny.com'),
('Rachel Green',              'rachel@friends.com'),
('Monica Geller',             'monica@friends.com'),
('Ross Geller',               'ross@friends.com'),
('Chandler Bing',             'chandler@friends.com'),
('Joey Tribbiani',            'joey@friends.com'),
('Phoebe Buffay',             'phoebe@friends.com'),
('Larry David',               'larry@enthusiasm.com'),
('Cheryl David',              'cheryl@enthusiasm.com'),
('Jeff Greene',               'jeff@enthusiasm.com'),
('Leon Black',                'leon@enthusiasm.com'),
('Richard Lewis',             'lewis@enthusiasm.com');

INSERT INTO groups (group_name, price_limit, deadline_at) VALUES
('The Red Dot',                '$20',  'December 20, 1998'),
('The Paddy Wagon',            '$10',  'December 1, 2021'),
('The Holiday Armadillo',      '$50',  'December 20, 2004'),
('The Secret Santa From Hell', '$100', 'November 24, 2021');

INSERT INTO group_users (group_id, user_id, is_admin) VALUES
(1,  1, true ),
(1,  2, false), 
(1,  3, false), 
(1,  4, false), 
(2,  5, true ),
(2,  6, false), 
(2,  7, false), 
(2,  8, false), 
(2,  9, false), 
(3, 10, false),
(3, 11, true ),
(3, 12, false),
(3, 13, false),
(3, 14, false),
(3, 15, false),
(4, 16, false),
(4, 17, false),
(4, 18, false),
(4, 19, false),
(4, 20, true);

INSERT INTO items (name, description, price, url) VALUES
('Novelty Socks', 'Haute Soiree - Women''s Novelty Socks - “If You Can Read This, Bring Me Some” - One Size Fits All', '$8.95', 'https://www.amazon.com/dp/B01LBUG9CK'),
('Meat Shredder', 'Arres Pulled Pork Claws & Meat Shredder - BBQ Grill Tools and Smoking Accessories for Carving, Handling, Lifting (Meat Claws)', '$9.97', 'https://www.amazon.com/dp/B01N6SKSMF'),
('Inspirational Bracelet', 'You are Braver Stronger Smarter than you think Inspirational Expandable Bangle Bracelet Women', '$9.99', 'https://www.amazon.com/dp/B072PZPYJN'),
('Toilet Putter', 'Potty Putter Toilet Time Golf Game', '$14.99', 'https://www.amazon.com/dp/B000LC65QA'),
('Novelty Pizza Cutter', 'Genuine Fred BOSS 3000 Genuine Fred Circular Saw Pizza Wheel, Standard', '16.59', 'https://www.amazon.com/dp/B001XSFW42'),
('Bluetooth Sleep Mask', 'MUSICOZY Sleep Headphones Bluetooth Headband Sleeping Headphones Sleep Mask, Wireless Sleep Mask Earbuds for Side Sleepers Men Women Office Nap Air Travel Cool Tech Gadgets Unique Gifts Boys Girls', '$19.88', 'https://www.amazon.com/dp/B07TPLZY74'),
('Nicolas Cage Prayer Candle', 'Cage Celebrity Prayer Candle - Funny Saint Candle - 8 inch Glass Prayer Votive - 100% Handmade in USA - Novelty Celebrity Gift', '$27.95', 'https://www.amazon.com/dp/B07BTDJHLJ'),
('Drawing Pencil Set', 'Drawing Pencils Art Supplies - 37pc Drawing Kit Art Set Includes Digital Drawing Tutorials Ebook Library, Sketchbook for Drawing, Charcoal Pencils, Kneaded Eraser, and Blending Stumps', '$29.95', 'https://www.amazon.com/dp/B01FTT11WW'), 
('BBQ Grilling Set', 'POLIGO 26 PCS BBQ Set Grilling Tool with Case - Camping Grill Set Stainless Steel Barbeque Grill Accessories for Outdoor Grill - Premium Grill Utensils Set Ideal Fathers Day Grilling Gifts for Men', '$31.99', 'https://www.amazon.com/dp/B07FGFJ6PC'),
('Electric Wine Opener', 'Electric Wine Opener Set with Charger and Batteries- Gift Set for Wine Lovers - Anniversary Birthday Gift Idea Kit Cordless Electric Wine Bottle Opener Uncle Viner G105', '$37.90', 'https://www.amazon.com/dp/B01N7IHJOH'),
('Cheese Board and Knife Set', 'Cheese Board and Knife Set - Large Charcuterie Board Serving Platter - Unique Christmas Present, Gift for Wedding, Housewarming, Bridal Shower, Birthday Gifts for Mom', '$59.99', 'https://www.amazon.com/dp/B01DTFF0Y8'),
('Moscow Mule Copper Mugs Set of 8', 'Kitchen Science Moscow Mule Copper Mugs Set of 8 (16oz) w/ 8 Straws & 1 Jigger | 100% Pure Copper Cups, Tarnish-Resistant Food Grade Lacquered Finish, Ergonomic Handle (No Rivet) w/ Solid Grip', '$57.99', 'https://www.amazon.com/dp/B07S8ZR1CH'),
('HoHoHoH2o', 'HoHoHoH2o Automatic Christmas Tree Watering System Device, Santa’s Tree Helper Keeps Your Christmas Tree Healthy and Fresh, Refillable 2.5 gallons Capacity Box - Silver/Festive', '$89.95', 'https://www.amazon.com/dp/B07ZWF6NQ7');
