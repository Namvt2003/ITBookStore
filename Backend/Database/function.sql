DELIMITER //

CREATE FUNCTION calculate_total_quantity() 
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE total INT;
    
    SELECT SUM(quantity) INTO total
    FROM cart_item;
    
    RETURN total;
END //

DELIMITER ;