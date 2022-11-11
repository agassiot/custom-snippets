import { openDB } from 'idb';

var initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

var composeDB = (trans)=>{
      (db)=> trans = db.transaction('jate','readwrite')
      return trans.objectStore('jate')
    }

var curryPost = (name, home, cell, email)=>{
  (composed)=>{
    return composed.add({name: name, home_phone: home, cell_phone: cell, email: email});
  }
}

var curryGet = (content)=>{
  (composed)=>{
    return composed.get({id: 1, content: content});
  }
}

var curryPut = (content)=>{
  (composed)=>{
    return composed.put({id: 1, content: content});
  }
}

var curryDel = (id)=>{
  (composed)=>{
    return composed.delete(id);
  }
}

var curriedPost = curryPost(composeDB);
var curriedGet = curryGet(composeDB);
var curriedPut = curryPut(composeDB);
var curriedDel = curryDel(composeDB);

//--------
export var postDB = async (name, home, cell, email) => {
  let sniperDB = await openDB('jate', 1);
  let result = await curriedPost(sniperDB)(name,home,cell,email);
  return console.log('save successful', result);
}

export var getDb = async (content) => {
  let sniperDB = await openDB('jate', 1);
  let result = await curriedGet(sniperDB)(content)
  return result.value;
}

export var putDb = async (content) => {
  let sniperDB = await openDB('jate', 1);
  let result = await curriedPut(sniperDB)(content)
  return console.log('save successful', result);
}

export var deleteDB = async (id) => {
  let sniperDB = await openDB('jate', 1);
  let result = await curriedDel(sniperDB)(id);
  return result?.value;
}

initdb();
