const sqlite3 = require('sqlite3').verbose();
const dbName = "Articles";
// 连接到一个数据库文件
const db = new sqlite3.Database(dbName);

// 如果还没有，创建一个“articles”表
db.serialize(() =>{
    const sql = `
        CREATE TABLE IF NOT EXISTS articles 
           (id integer primary key, title, content TEXT)
    `;
    db.run(sql);
});

class Article {
    // 获取所有文章
    static all(cb){
        db.all('SELECT * FROM articles', cb);
    },

    // 选择一篇指定的文章
    static find(id, cb){
        db.get('SELECT * FROM articles WHERE id = ?', id, cb);
    }

    // 创建一篇有标题和内容的文章
    static create(data, cb){
        const sql = 'INSERT INFO articles(title, content) VALUES (?, ?)';
        db.run(sql, data.title, data.content, cb); 
    }

    // 根据id删除文章
    static delete(id, cb){
        if (!id) {
            return cb(new Error('Please provide an id'));
            db.run('DELETE FROM articles WHERE id = ?', id, cb);
        }
    }
}

module.exports = db;
module.exports.Article = Article;