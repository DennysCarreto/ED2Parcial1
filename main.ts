class Producto {
    //private codigo: string;
    private codigo: number;
    private nombre: string;
    private precio_costo: string;
    private precio_venta: string;

    constructor(codigo: number, nombre: string, precio_costo: string, precio_venta: string){
        this.codigo = codigo;
        this.nombre = nombre;
        this.precio_costo = precio_costo;
        this.precio_venta = precio_venta
    }
    public getCodigo():number{
        return this.codigo;
    }
    public getNombre():string{
        return this.nombre;
    }
    public getCosto(): string{
        return this.precio_costo;
    }
    public getVenta(): string{
        return this.precio_venta;
    }
    public imprimir(): string{
        return this.codigo.toString()+' '+ this.nombre +' '+ this.precio_costo+' '+this.precio_venta;
    }
}

class Nodo{
    public producto: Producto;
    public anterior: Nodo | null;
    public siguiente: Nodo | null;

    constructor(producto: Producto){
        this.producto = producto;
        this.anterior = null;
        this.siguiente = null;
    }
}

class DoubleLinkedList{
    public inicio: Nodo | null;
    public final: Nodo | null;
    public tamanio: number;

    constructor(){
        this.inicio = null;
        this.final = null;
        this.tamanio = 0;
    }
    public estaVacia(): boolean{
        return this.inicio === null;
    }
    public insertarInicio(producto: Producto): void{
        let newNodo: Nodo = new Nodo(producto);
        if(this.estaVacia()){
            this.inicio = newNodo;
            this.final = newNodo;
        }
        else{
            newNodo.siguiente = this.inicio;
            if (this.inicio !== null) {
                this.inicio.anterior = newNodo;
            }
            this.inicio = newNodo;
        }
    this.tamanio += 1
    }

    public insertFinal(producto: Producto): void{
        let newNodo: Nodo = new Nodo(producto);
        if(this.estaVacia()){
            this.inicio = newNodo;
            this.final = newNodo;
        }
        else{
            newNodo.anterior = this.final;
            if (this.final !== null) {producto
                this.final.siguiente = newNodo;
            }
            this.final = newNodo
        }
    this.tamanio += 1
    }
}

class HashTable {
    private size: number;
    private data: DoubleLinkedList[];

    constructor() {
        this.size = 10;
        this.data = new Array(10);
        // asignar a cada casilla una lista/nodo
        for (let i = 0; i < this.size; i++) {
            this.data[i] = new DoubleLinkedList();
        }
    }

    public imprimirHash(): void{
        for (let i = 0; i < this.size; i++) {
            console.log(`Casilla${i}:`);
            if (this.data[i].estaVacia()) {
                console.log("Vacía");
                console.log();
            } else {
                let currentNode = this.data[i].inicio;
                while (currentNode !== null) {
                    //process.stdout.write(` ${currentNode.student.imprimir()} ->`);
                    console.log(` ${currentNode.producto.imprimir()} ->`);
                    currentNode = currentNode.siguiente;
                }
                console.log();
            }
        }
    }

    private hash(key: number): number {
        return key % this.size;
    }

    public insert(producto: Producto): void {
        let index: number = this.hash(producto.getCodigo());
        this.data[index].insertFinal(producto);
    }

    public search(key: number): Producto | null {
        let index: number = this.hash(key);
        let currentNode = this.data[index].inicio;
        while (currentNode !== null) {
            if (currentNode.producto.getCodigo() === key) {
                return currentNode.producto;
            }
            currentNode = currentNode.siguiente;
        }
        return null;
    }
}


console.log('Dennys Rolando Y. Carreto Aguilon - 2276616');
console.log();

let letra:string = 'C';
let code: string = letra+1010;
let ascii = code.charCodeAt(0);
console.log(ascii)


//let aspirina: Producto = new Producto('C1010', 'Aspirina', '1', '2');

let aspirina: Producto = new Producto(1515, 'Aspirina', '1', '2');
let pepto: Producto = new Producto(1516, 'Pepto-Bismol', '3', '4');
let koldGrip: Producto = new Producto(1517, 'koldGrip', '4', '5');
let acetaminofen: Producto = new Producto(1518, 'Acetaminofen', '9', '10');
let tabcin: Producto = new Producto(1501, 'tabcin', '2', '3');
let p1: Producto = new Producto(1506, 'producto 1', '9', '10');
let p2: Producto = new Producto(1503, 'producto 2', '9', '10');
let p3: Producto = new Producto(1505, 'producto 3', '10', '15')
let p4: Producto = new Producto(1504, 'producto 4', '10', '12');
let p5: Producto = new Producto(1504, 'producto 5', '1', '5');
// Prueba para ver las coliciones en caso de que el codigo se repite
let p6: Producto = new Producto(1, 'suero', '1', '5');


let tablaHash: HashTable = new HashTable();

tablaHash.insert(aspirina);
tablaHash.insert(pepto);
tablaHash.insert(koldGrip);
tablaHash.insert(acetaminofen);
tablaHash.insert(tabcin);
tablaHash.insert(p1);
tablaHash.insert(p2);
tablaHash.insert(p3);
tablaHash.insert(p4);
tablaHash.insert(p5);
//colision
tablaHash.insert(p6);


let productoDesc: Producto| null;
productoDesc = tablaHash.search(1);
if (productoDesc !== null) {
    console.log('Se encontro el producto: ')
    console.log(productoDesc.imprimir());
} else {
    console.log("Producto no encontrado");
}

console.log("Contenido de la tabla hash:");
tablaHash.imprimirHash();