

const ArticlesService = {
    getAllArticles(db) {
        return db.select('*').from('blogful_articles')
    }
}

module.exports = ArticlesService;