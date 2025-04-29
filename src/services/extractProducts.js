import nlp from 'compromise';

const extractProducts = (query) => {
    let doc = nlp(query);
    let matches = doc.match('#Adjective? #Noun').out('array');

    let products = matches
        .map(p => p.toLowerCase())
        .filter(p => p.length > 3);

    return [...new Set(products)];
};

export default extractProducts;
