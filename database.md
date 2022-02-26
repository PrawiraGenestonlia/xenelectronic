User (CRUD)
 ⁃ id
 ⁃ email
 ⁃ role
 - carts

categories (CRUD)
 ⁃ id
 ⁃ categoryName (unique)
 ⁃ categoryDescription (allow null)
 ⁃ categoryImageUrl

products (CRUD)
 ⁃ id
 ⁃ categoryName
 ⁃ productName
 ⁃ previewImageUrl
 ⁃ description
 ⁃ postedDate
 ⁃ price
 ⁃ isAvailable
 ⁃ discountPercentage
 ⁃ discountEndDate

carts (CRUD)
 ⁃ userId
 ⁃ productId
