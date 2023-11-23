const productsModels = require('../../models/productsModels_api');

const controller = {
    getList: async (req, res) => {
        try {
            const product = await productsModels.findAll();

            const countByCategory = {
                Albumes: product.filter(parameter => parameter.type === 'Album').length,
                Pistas: product.filter(parameter => parameter.type === 'Track').length
            };
            const uniqueArtist = new Set(product.map(product => product.artist));
            const totalArtist = uniqueArtist.size;


            res.json({
                total: product.length,
                total_categorias: countByCategory,
                total_artistas: totalArtist,
                productos: product,
                status: 200
                
        })
        } catch (error) {
            console.error(error);
            res.status(500).send('Error interno del servidor');
        }
    },
    getProduct: async (req, res) => {
        try {
            const product = await productsModels.findById(req.params.id);
            product.image = "/public/"+product.image;
            res.json({
                producto: product,
                status: 200
            })
        } catch(error){
            console.error(error);
            res.status(500).send('Error interno del servidor');
        }
    }
}


module.exports = controller;