-- Active: 1697839897194@@10.11.33.8@3306@saldbd

DROP PROCEDURE spProductGetFiltering

CREATE PROCEDURE spProductGetFiltering (
	IN _code VARCHAR(50) ,
    IN _catalogtypeID INT,
    IN _status TINYTEXT
)
BEGIN
    SELECT 
        pr.ProductID, 
        pr.Code, 
        pr.Name, 
        pr.CatalogtypeID, 
        pr.Status,
        prc.Color,
        prc.Size,
        prc.Size,
        prc.Weight,
        prc.Dimensions,
        prc.Price
    FROM product pr
    LEFT JOIN productcharacteristic_ prc 
    ON pr.ProductID = prc.ProductID
    WHERE Code = IFNULL(_code,Code)
    AND pr.CatalogtypeID = IFNULL(_catalogtypeID,CatalogtypeID);
END 

DROP PROCEDURE spProductGetByID

CREATE PROCEDURE spProductGetByID (
	IN _productID INT
)
BEGIN
    SELECT 
        pr.ProductID, 
        pr.Code, 
        pr.Name, 
        pr.CatalogtypeID, 
        pr.Status,
        prc.Color,
        prc.Size,
        prc.Size,
        prc.Weight,
        prc.Dimensions,
        prc.Price
    FROM product pr
    LEFT JOIN productcharacteristic_ prc 
    ON pr.ProductID = prc.ProductID
    WHERE pr.ProductID = IFNULL(_productID,pr.ProductID);
END 

DROP PROCEDURE spProductAdd;

CREATE PROCEDURE spProductAdd (
	IN _code VARCHAR(50),
	IN _name VARCHAR(50),
    IN _catalogtypeID INT,
    IN _status TINYTEXT
)
BEGIN

/*     IF _productID = 0 THEN
        INSERT INTO product (Code,Name,Description,CatalogtypeID,Status,Quantity) values (_code,_name,_description,_catalogtypeID,_status,_quantity);
    ELSE
        SELECT * FROM product;
    END IF; */

    INSERT INTO product (Code,Name, CatalogtypeID, Status) values (_code,_name,_catalogtypeID, _status);

    SELECT * FROM product;
END 

DROP PROCEDURE spProductAddOrEdit;

CREATE PROCEDURE spProductAddOrEdit (
IN _productID INT,
IN _code VARCHAR(50),
IN _name VARCHAR(50),
IN _catalogtypeID INT,
IN _status TINYTEXT,
IN _color VARCHAR(15),
IN _size CHAR(10),
IN _weight VARCHAR(50),
IN _dimensions VARCHAR(30),
IN _price DECIMAL(10,2)
)
BEGIN 
IF _productID is null THEN
    INSERT INTO product (Code, Name, CatalogtypeID, Status) VALUES (_code, _name, _catalogtypeID, _status);
    SET _productID = LAST_INSERT_ID();
    INSERT INTO productcharacteristic_ (ProductID,Color,Size,Weight,Dimensions,Price) VALUES (_productID,_color,_size,_weight,_dimensions,_price);
ELSE
    UPDATE product pr 
    SET Name = _name,
        pr.CatalogtypeID = _catalogtypeID, 
        pr.Status = _status
    WHERE pr.ProductID = _productID;

    UPDATE productcharacteristic_  
    SET Color = _color, 
        Size = _size, 
        Weight = _weight, 
        Dimensions = _dimensions, 
        Price = _price
    WHERE ProductID = IFNULL(_productID, ProductID);
END IF;
IF ROW_COUNT() > 0 THEN
    SELECT 
    pr.ProductID,
    pr.Code, 
    pr.Name, 
    pr.CatalogtypeID, 
    pr.Status, 
    prc.Color, 
    prc.Size, 
    prc.Weight, 
    prc.Dimensions, 
    prc.Price
FROM product pr
LEFT JOIN productcharacteristic_ prc
ON pr.ProductID = prc.ProductID
WHERE pr.ProductID = IFNULL (_productID, pr.ProductID); 
END IF;
END

DROP PROCEDURE spProductDelByID

CREATE PROCEDURE spProductDelByID (
	IN _productID INT
)
BEGIN
    DELETE 
    FROM productcharacteristic_ prc 
    WHERE prc.ProductID = _productID;

    DELETE 
    FROM product pr
    WHERE pr.ProductID = _productID;
END