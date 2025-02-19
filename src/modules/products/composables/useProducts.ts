// import type { Product } from "~/types/product";

import { ref } from 'vue'

export const useProducts = () => {
  // const snackbar = useSnackbar();
  // const products = ref<Product[]>([]);
  const isLoadingProducts = ref(false)

  const fetchProducts = async () => {
    isLoadingProducts.value = true
    try {
      // const productsResponse = await $fetch('https://fakestoreapi.com/products')
      // if (!productsResponse) throw Error('Error al buscar los productos')
      // const productsList = productsResponse as Product[];
      // products.value = productsList;
    } catch (error) {
      console.error('Error fetching products: ', error)
      // snackbar.add({
      //   type: 'error',
      //   dismissible: true,
      //   title: 'Ups algo fallo!',
      //   text: `Vuelve a intentarlo mas tarde`
      // })
    }
    isLoadingProducts.value = false
  }

  // Eliminar un producto
  const deleteProduct = async (productId: number) => {
    // products.value = products.value.filter((product) => product.id !== productId);
  }

  return {
    fetchProducts,
    deleteProduct,
    isLoadingProducts,
    // products
  }
}
