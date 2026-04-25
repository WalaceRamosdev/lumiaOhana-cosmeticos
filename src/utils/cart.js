/**
 * Lumiá OHANA - Cart Utility
 * Simple cart management using localStorage and CustomEvents
 */

export const CART_EVENT = 'cart-updated';

export function getCart() {
    if (typeof window === 'undefined') return [];
    const cart = localStorage.getItem('lumia_cart');
    return cart ? JSON.parse(cart) : [];
}

export function addToCart(product) {
    const cart = getCart();
    const existing = cart.find(item => item.id === product.id);
    
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('lumia_cart', JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent(CART_EVENT, { detail: cart }));
}

export function removeFromCart(productId) {
    const cart = getCart().filter(item => item.id !== productId);
    localStorage.setItem('lumia_cart', JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent(CART_EVENT, { detail: cart }));
}

export function clearCart() {
    localStorage.removeItem('lumia_cart');
    window.dispatchEvent(new CustomEvent(CART_EVENT, { detail: [] }));
}

export function getCartCount() {
    return getCart().reduce((acc, item) => acc + item.quantity, 0);
}
