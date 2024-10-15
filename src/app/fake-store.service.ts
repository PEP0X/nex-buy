import { Injectable } from '@angular/core';
import axios from 'axios';
@Injectable({
  providedIn: 'root',
})
export class FakeStoreService {
  constructor() {}

  // Fake Store API

  // Get all products
  async getAllProducts() {
    return axios
      .get('https://fakestoreapi.com/products')
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }

  // Get a single product by id
  async getProductById(productId: number) {
    return axios
      .get(`https://fakestoreapi.com/products/${productId}`)
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.error(`Error fetching product ${productId}:`, error);
      });
  }

  // Limit Results
  async getLimitedProducts(limit: number) {
    return axios
      .get(`https://fakestoreapi.com/products?limit=${limit}`)
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.error('Error fetching limited products:', error);
      });
  }

  // Sort Results
  async getSortedProducts(order: 'asc' | 'desc') {
    return axios
      .get(`https://fakestoreapi.com/products?sort=${order}`)
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.error(`Error sorting products in ${order} order:`, error);
      });
  }

  // Get All Categories
  async getAllCategories() {
    return axios
      .get('https://fakestoreapi.com/products/categories')
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }

  // Get Products by Category
  async getProductsByCategory(category: string) {
    return axios
      .get(`https://fakestoreapi.com/products/category/${category}`)
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.error(
          `Error fetching products in category ${category}:`,
          error
        );
      });
  }

  // Get a Single Cart
  async getCartById(cartId: number) {
    return axios
      .get(`https://fakestoreapi.com/carts/${cartId}`)
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.error(`Error fetching cart ${cartId}:`, error);
      });
  }

  // login
  async login(username: string, password: string) {
    return axios
      .post('https://fakestoreapi.com/auth/login', {
        username,
        password,
      })
      .then((response) => {
        console.log('Login successful:', response.data);
        return response.data;
      })
      .catch((error) => {
        console.error('Error during login:', error);
      });
  }
  // Register
  async registerUser(user: any) {
    return axios
      .post('https://fakestoreapi.com/users', user)
      .then((response) => {
        console.log('User registered successfully:', response.data);
        return response.data;
      })
      .catch((error) => {
        console.error('Error during registration:', error);
      });
  }

  // Filter products by category and price range
  async getFilteredProducts(category?: string, minPrice?: number, maxPrice?: number) {
    try {
      let url = 'https://fakestoreapi.com/products';

      if (category) {
        url += `/category/${category}`;
      }

      const response = await axios.get(url);
      let filteredProducts = response.data;

      if (minPrice !== undefined || maxPrice !== undefined) {
        filteredProducts = filteredProducts.filter((product: any) => {
          if (minPrice !== undefined && maxPrice !== undefined) {
            return product.price >= minPrice && product.price <= maxPrice;
          } else if (minPrice !== undefined) {
            return product.price >= minPrice;
          } else if (maxPrice !== undefined) {
            return product.price <= maxPrice;
          }
          return true;
        });
      }

      console.log('Filtered products:', filteredProducts);
      return filteredProducts;
    } catch (error) {
      console.error('Error fetching filtered products:', error);
      throw error;
    }
  }

  // Get unique sizes from all products (mock data as the API doesn't provide sizes)
  async getAvailableSizes() {
    // This is mock data. In a real scenario, you'd fetch this from your backend
    return ['XS', 'S', 'M', 'L', 'XL'];
  }

  // Get unique colors from all products (mock data as the API doesn't provide colors)
  async getAvailableColors() {
    // This is mock data. In a real scenario, you'd fetch this from your backend
    return ['green', 'white', 'black', 'red', 'blue'];
  }

  // Get price range (min and max prices from all products)
  async getPriceRange() {
    try {
      const products = await this.getAllProducts();
      const prices = products.map((product: any) => product.price);
      return {
        min: Math.min(...prices),
        max: Math.max(...prices)
      };
    } catch (error) {
      console.error('Error fetching price range:', error);
      throw error;
    }
  }
}
