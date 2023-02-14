const fs  = require("fs");

class ProductManager{
    #Contador = 1;
    #path = ""

    constructor(path){
        this.#path = path;
    }

    async getProducts(){
        try{
            const products = await fs.promises.readFile(this.#path, "utf-8"); 
            return JSON.parse(products)
        }catch(error){
            return [];
        }
    }

    async getProductById(id){
        const products = await this.getProducts();
        if (products.find(product => product.id == id)){
            return products.find((product) => product.id == id)
        }else{
            console.log("Product Not found");
        }
    }

    async addProduct(title,price,thumbnail,code,stock){
        const products = await this.getProducts();

        const newProduct = {
            id : this.#Contador,
            title,
            price,
            thumbnail,
            code,
            stock,
        };
        if (!title || !price || !thumbnail || !code || !stock){
            console.log("Faltan cargar Paramentros")    
            }
            else{
                const productoRepetido = products.find((prod) => prod.code == code)
                if (!productoRepetido){;
                    await fs.promises.writeFile(this.#path, JSON.stringify([...products, newProduct]))
                    console.log (`Producto ${title} agregado con exito y con id generado ${this.#Contador}`)
                    this.#Contador += 1;
                }
                else{
                    console.log (`El producto con el código ${code} ya se encuentra cargado, modifique el codigo`)
                    }
                }
        }
    
    async updateProduct(id, propModify){
        const products = await this.getProducts();
        let auxiliar = products.find((prod) => prod.id == id);
        if (!auxiliar){
            console.log(`El producto con id: ${id} no se encuentra en la base de datos`)
            }else{
                auxiliar = {...auxiliar, ...propModify}
                let newArray = products.filter((prod) => prod.id !== id);
                newArray = [...newArray, auxiliar]
                await fs.promises.writeFile(this.#path, JSON.stringify(newArray))
                console.log ("Modificación exitosa")
            }
        }

    async deleteProduct(id){
        const products = await this.getProducts();
        const auxiliar = products.filter((prod) => prod.id !== id);
        await fs.promises.writeFile(this.#path, JSON.stringify(auxiliar)) //reescribo el archivo
                    console.log (`Se ha eliminado el producto con el id : ${id}`)
        }

    }

/// Pruebas ///
async function Test(){
    const manager1 = new ProductManager("./products.json")
    await manager1.addProduct("Gorro",400,"img",1,20);
    console.table (await manager1.getProducts())
    await manager1.addProduct("Zapatos",200,"img",1,20);
    await manager1.addProduct("Bufanda",400,"img",2,20);
    console.table (await manager1.getProducts());
    console.table (await manager1.getProductById(1));
    await manager1.updateProduct(1,{title: "Remera", price: 5000})
    console.table (await manager1.getProducts());
    await manager1.deleteProduct(2);
    console.table (await manager1.getProducts());
}
Test();

