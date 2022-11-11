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

const composeDB = (db)=>{
      let trans = db.transaction('jate','readwrite')
      return trans.objectStore('jate')
    }

const curryGet= (composed)=>(x)=>composed.get(x);
const curryPut = (composed)=>(content)=>composed.put({id: 1, text: content});
  



//--------


export var getDb = async () => {
  let sniperDB = await openDB('jate', 1);
  const curriedGet = curryGet(composeDB(sniperDB))
  let result = await curriedGet(1)
  return result?.value;
}

export var putDb = async (content) => {
  let sniperDB = await openDB('jate', 1);
  const curriedPut = curryPut(composeDB(sniperDB));
  let result = await curriedPut(content)
  return console.log('save successful', result);
}




initdb();
