// const supertest = require('supertest')
const knex=require('knex')
const app = require('../src/app')
const { makeArticlesArray } = require('./articles-fixtures')

describe('Articles Endpoints',()=>{
    const testArticles = makeArticlesArray()

    let db
    before('setup db',()=>{
        db = knex({
            client:'pg',
            connection: process.env.TEST_DB_URL
        })
        app.set('db',db)
    })

    before('clean tables',()=> db('blogful_articles').truncate())
    afterEach('clean tables',()=> db('blogful_articles').truncate())
    after('destroy conn',()=>db.destroy())
    
    describe('GET /articles', ()=>{
        it('should return 200 and empty array if db empty',()=>{
            return supertest(app)
                    .get('/articles')
                    .expect(200,[])
        })
        context('with articles populated',()=> {
            beforeEach('insert articles', ()=> db('blogful_articles').insert(testArticles))

            it('should return 200 and article array when db populated',()=>{
                return supertest(app)
                    .get('/articles')
                    .expect(200, testArticles)
            })
        })
    })
})
