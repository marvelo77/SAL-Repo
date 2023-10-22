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
    AND CatalogtypeID = IFNULL(_catalogtypeID,CatalogtypeID)
    AND Status = IFNULL (_status,'active'); 
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

