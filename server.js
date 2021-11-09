import {createServer} from 'http';
import {parse} from 'url';
import { writeFile, readFileSync, existsSync } from 'fs';
const faker = require('faker');
const app = express();

let database;
if (existsSync("database.json")){
    database = JSON.parse(readFileSync("databse.js"));
}else{
    database = {
        group: [],
        user: []
    };
}
createServer(async (req, res) => {
    const parsed = parse(req.url, true);

    if (parsed.pathname === '/login'){
        let body = '';
        req.on('data', data => body += data);
        req.on('end', () => {
            const data = JSON.parse(body);
            database.user.push({
                name: faker.name.firstName(),
                password: faker.internet.password()
            });

            writeFile("database.json", JSON.stringify(database), err =>{
                if (err){
                    console.err(err);
                } else res.end();
            });
        });
    }else if (parsed.pathname === '/user/new'){
        let body = '';
        req.on('data', data => body += data);
        req.on('end', () => {
            const data = JSON.parse(body);
            database.user.push({
                name: faker.name.firstName(),
                password: faker.internet.password(),
                email: faker.internet.email(),
                address: faker.address.streetAddress(),
                wishlist: faker.lorem.words()
            });

            writeFile("database.json", JSON.stringify(database), err => {
                if (err) {
                    console.err(err);
                } else res.end();
            });
        });
    }else if (parsed.pathname === '/user/edit'){
        let body = '';
        req.on('data', data => body += data);
        req.on('end', () => {
            const data = JSON.parse(body);
            database.user.push({
                name: faker.name.firstName(),
                address: faker.address.streetAddress()
            });
            writeFile("database.json", JSON.stringify(database), err => {
                if (err) {
                    console.err(err);
                } else res.end();
            });
        });
    }else if (parsed.pathname === '/group/new'){
        let body = '';
        req.on('data', data => body += data);
        req.on('end', () => {
            const data = JSON.parse(body);
            database.group.push({
                groupName: faker.name.firstName(),
                members: faker.name.firstName(),
                code: faker.random.number()
            });

            writeFile("database.json", JSON.stringify(database), err => {
                if (err) {
                    console.err(err);
                } else res.end();
            });
        });
    }else if (parsed.pathname === '/group/userName/delete'){
        let body = '';
        req.on('data', data => body += data);
        req.on('end', () => {
            const data = JSON.parse(body);
            database.group.delete({
                groupName: faker.name.firstName(),
            });
            writeFile("database.json", JSON.stringify(database), err => {
                if (err) {
                    console.err(err);
                } else res.end();
            });
        });
    }else if (parsed.pathname === '/group/view'){
        res.end(JSON.stringify(
            database.group.groupName,
            database.group.members
        ));
    }else if (parsed.pathname === '/group/userName/view'){
        res.end(JSON.stringify(
            database.group.members,
            database.user.wishlist
        ));
    } else {
        res.writeHead(404);
        res.end();
    }

}).listen(8080);