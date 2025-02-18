export const isProductQuery = (message) => {
    const productKeywords = [
        'buy', 'purchase', 'recommend', 'suggestion', 'product',
        'cart', 'shop', 'price', 'cost', 'where can i get',
        'looking for', 'want to buy', 'shopping', 'can you', 'find me', 'get me', 'show me',
        'order', 'pricing', 'discount', 'deal', 'best price', 'sale', 'coupon', 'promo code',
        'available now', 'compare','which is better', 'pros and cons', 'benefits', 'price comparison',
        'I want to get', 'I\'m looking for', 'I need', 'I want', 'I\'m interested in', 'I\'m searching for',
        'ready to buy', 'can you help me find', 'can you help me get', 'can you help me order', 'can I get', 'I am looking', 'need', 'find', 'check',
    ];
    return productKeywords.some(keyword =>
        message.toLowerCase().includes(keyword)
    );
};
