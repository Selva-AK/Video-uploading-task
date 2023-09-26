const mysql=require('mysql')

const con=mysql.createConnection(
    host='localhost',
    user='root',
    password='novalnet',
    database='Selva_Novalnet'
)