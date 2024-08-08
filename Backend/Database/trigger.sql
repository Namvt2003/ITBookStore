DELIMITER //

CREATE TRIGGER after_user_insert
AFTER INSERT ON users
FOR EACH ROW
BEGIN
	INSERT INTO user_role(id, role_name) VALUES(NEW.id, 'customer');
	
END//

DELIMITER;




 






DELIMITER //

CREATE TRIGGER before_cart_item_insert
BEFORE INSERT ON cart_item
FOR EACH ROW
BEGIN
    DECLARE existing_id BIGINT;
    DECLARE existing_quantity INT;
    
   
    SELECT id, quantity INTO existing_id, existing_quantity
    FROM cart_item
    WHERE title = NEW.title
    LIMIT 1;
    
    IF existing_id IS NOT NULL THEN
        UPDATE cart_item
        SET quantity = existing_quantity + NEW.quantity,
            total_price = (existing_quantity + NEW.quantity) * (total_price / existing_quantity)
        WHERE id = existing_id;
        
        -- Prevent the new insert by signaling an error
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Item already exists. Quantity updated.';
    END IF;
END //

DELIMITER ;

DELIMITER //

CREATE TRIGGER before_cart_item_insert
BEFORE INSERT ON cart_item
FOR EACH ROW
BEGIN
    DECLARE existing_id BIGINT;
    DECLARE existing_quantity INT;
    
   
    SELECT id, quantity INTO existing_id, existing_quantity
    FROM cart_item
    WHERE title = NEW.title
    LIMIT 1;
    
    IF existing_id IS NOT NULL THEN
        UPDATE cart_item
        SET quantity = existing_quantity + NEW.quantity,
            total_price = (existing_quantity + NEW.quantity) * (total_price / existing_quantity)
        WHERE id = existing_id;
        
        -- Prevent the new insert by signaling an error
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Item already exists. Quantity updated.';
    END IF;
END //

DELIMITER ;




------------------------------------------------------------------------------------------------------


DELIMITER //

 
CREATE TRIGGER before_cart_item_insert
BEFORE INSERT ON cart_item
FOR EACH ROW
BEGIN
    DECLARE existing_id BIGINT;
    DECLARE existing_quantity INT;
    
    SELECT id, quantity INTO existing_id, existing_quantity
    FROM cart_item
    WHERE title = NEW.title
    LIMIT 1;
    
    IF existing_id IS NOT NULL THEN
        -- Set a flag in the NEW row to indicate an update is needed
        SET NEW.id = existing_id;
        SET NEW.quantity = existing_quantity + NEW.quantity;
        SET NEW.total_price = NEW.quantity * (NEW.total_price / NEW.quantity);
    END IF;
END //

-- Second trigger: AFTER INSERT
CREATE TRIGGER after_cart_item_insert
AFTER INSERT ON cart_item
FOR EACH ROW
BEGIN
    IF NEW.id IN (SELECT id FROM cart_item WHERE id != NEW.id) THEN
        -- An existing item was "inserted", so we need to update it
        UPDATE cart_item
        SET quantity = NEW.quantity,
            total_price = NEW.total_price
        WHERE id = NEW.id;
        
        -- Delete the duplicate row that was just inserted
        DELETE FROM cart_item WHERE id = LAST_INSERT_ID();
    END IF;
END //

DELIMITER ;
 
	