const estadoInicial = {
  productos: [
    { id: 1, nombre: "Producto 1", precio: "$45" },
    { id: 2, nombre: "Producto 2", precio: "$55" },
    { id: 3, nombre: "Producto 3", precio: "$65" },
    { id: 4, nombre: "Producto 4", precio: "$75" },
  ],
  carrito: [],
};

// Reducer es una funcion que se va a encargar
// de administrar el estado global de nuestra app.
const reducer = (estado = estadoInicial, accion) => {
  switch (accion.type) {
    case "AGREGAR_PRODUCTO_AL_CARRITO":
      const { nombre, idProdcutoAgregar } = accion;

      // Si el carrito no tiene elementos entonces agregamos uno.
      if (estado.carrito.length === 0) {
        return {
          ...estado,
          carrito: [{ id: idProdcutoAgregar, nombre: nombre, cantidad: 1 }],
        };
      } else {
        // De otra forma tenemos que revisar que el carrito no tenga ya prodcuto que queremos agregar
        // Si tiene ya el producto tenemos que actualizar su cantidad
        // Y si no tiene el producto con el ID entonces lo tenemos que agregar

        // Para poder editar tenemos que clonarlo
        const nuevoCarrito = [...estado.carrito];

        // Comprobamos si el carrito ya tiene el ID del producto que queremos agregar
        const AgregadoEnCarrito =
          nuevoCarrito.filter((productoDeCarrito) => {
            return productoDeCarrito.id === idProdcutoAgregar;
          }).length > 0;

        // Estamos accediendo a nuestor nuevo carrito que es un clon (lo clonamos para poder editarlo)
        // Ahora al nuevo arreglo conado la aplicamos FILTER (lo que va hacer es ejecutar la funcion por cada uno de los elementos del arreglo)
        // Cada de uno de los elementos lo llamamos "prodcutoDeCarrito", en la funcion lo hacemos es comprobar si el "productoDeCarrito.id" === idProdcutoAgregar
        // Entonces devolvemos el prodcuto en un nuevo arreglo, y como esta en un arreglo ahora podemos preguntar si tiene una cantidad de elementos mayor a 0 devuelve "True" o "False"
        // En caso de que "productoDeCarrito.id" ya se encuentre agregado o no

        // Si ya tiene el producto entonces lo tenemos que actualizar
        if (AgregadoEnCarrito) {
          // Para eso tenemos que buscarlo, obtener su posicion en el arreglo
          // Y en base a su posicion ya actualizamos el valor
          nuevoCarrito.forEach((productoDeCarrito, index) => {
            if (productoDeCarrito.id === idProdcutoAgregar) {
              const cantidad = nuevoCarrito[index].cantidad;
              nuevoCarrito[index] = {
                id: idProdcutoAgregar,
                nombre: nombre,
                cantidad: cantidad + 1,
              };
            }
          });
          // De otra forma agregamos el producto al arreglo
        } else {
          nuevoCarrito.push({
            id: idProdcutoAgregar,
            nombre: nombre,
            cantidad: 1,
          });
        }
        return {
          ...estado,
          carrito: nuevoCarrito,
        };
      }
    default:
      return estado;
  }
};

export default reducer;
