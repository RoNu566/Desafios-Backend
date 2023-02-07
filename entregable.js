class ProductManager{
    products = [];
    static Contador = 0;

    constructor(title,description,price,thumbnail,code,stock){
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.id = ProductManager.Contador
    }

    getProducts(){
        console.table (this.products)
        return this.products;
    }

    getProductById(id){
       
        if (this.products.find(product => product.id == id)!=undefined){
            return this.products.find(product => product.id == id)
        }else{
            return "Product Not found";
        }
    }

    addProduct(title,description,price,thumbnail,code,stock){
        if (!title || !description || !price || !thumbnail || !code || !stock){
        console.log("Faltan cargar Paramentros")    
        }
        else{
            const productoRepetido = this.products.find((prod)=>prod.code == code)
            if (!productoRepetido){
                ProductManager.Contador += 1;
                const newProduct = new ProductManager (title,description,price,thumbnail,code,stock);
                this.products = [...this.products, newProduct];
                console.log (`Producto ${title} agregado con exito y con id generado ${this.id}`);
                this.getProducts();
            }
            else{
                console.log (`El producto con el código ${code} ya se encuentra cargado, modifique el codigo`)
                }
            }
    }
}

const manager1 = new ProductManager();
const manager2 = new ProductManager();