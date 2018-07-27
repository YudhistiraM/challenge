let param = process.argv;
const fs = require('fs');

function read(){
  let agenda = fs.readFileSync('agenda.json', 'utf8');
  return JSON.parse(agenda);
}

function save(agenda){
  fs.writeFileSync('agenda.json', JSON.stringify(agenda, null, 3), 'utf8');
}

let agenda = [];
let fill =param[2].slice(7);

switch (param[2]) {
  case 'list':
  agenda = read();
  if(agenda.length > 0){
    for(let i = 0; i < agenda.length; i++){
      console.log(`${i + 1}. ${agenda[i].complete ? '[x]' : '[ ]'} ${agenda[i].task}.`);
    }
  }else{
    console.log('-- data kosong --');
  }
  break;

  case 'task':
  let ask = param.slice(3);
  agenda = read();
  if(ask >= 0){
    console.log(`${ask}. ${agenda[ask-1].complete ? '[x]' : '[ ]'} ${agenda[ask-1].task}.`);
  } else {
    console.log('-- data kosong --');
  }
  break;

  case 'add':
  let content = param.slice(3).join(' ');
  agenda = read();
  agenda.push({task: content, complete: false, tags:[]});
  save(agenda);
  console.log(`'${content}' telah ditambahkan.`);
  break;

  case 'delete':
  let hapus = param.slice(3);
  agenda = read();
  if (hapus <= agenda.length && hapus > 0) {
    console.log(`'${agenda[hapus-1].task}' telah dihapus dari daftar`);
    agenda.splice(hapus-1,1);
    save(agenda);
  } else {
    console.log("Tidak ada data yang dapat dihapus");
  }
  break;

  case 'complete':
  let checklist = param.slice(3)
  agenda = read();
  agenda[checklist-1]["complete"]= true;
  save(agenda);
  console.log(`"${agenda[checklist-1].task}" telah selesai`);
  break;

  case 'uncomplete':
  let unchecklist = param.slice(3)
  agenda = read();
  agenda[unchecklist-1]["complete"]= false;
  save(agenda);
  console.log(`"${agenda[unchecklist-1].task}" setatus selesai dibatalkan`);
  break;

  case 'list:outstanding':
  let outstanding = param.slice(3);
  agenda = read();
  if (outstanding == 'asc') {
    for(let i = 0; i < agenda.length; i++){
      if(agenda[i].complete == false){
        console.log(`${i + 1}. ${agenda[i].complete ? '[x]' : '[ ]'} ${agenda[i].task}.`);
      }
    }
  } else if (outstanding == 'desc') {
    for(let i = (agenda.length-1); i > -1; i--){
      if(agenda[i].complete == false){
        console.log(`${i + 1}. ${agenda[i].complete ? '[x]' : '[ ]'} ${agenda[i].task}.`);
      }
    }
  } else {
    console.log("Masukkan data pengurutan tampilan 'asc atau desc'");
  }
  break;

  case 'list:completed':
  let done = param.slice(3);
  agenda = read();
  if (done == 'asc') {
    for(let i = 0; i < agenda.length; i++){
      if(agenda[i].complete == true){
        console.log(`${i + 1}. ${agenda[i].complete ? '[x]' : '[ ]'} ${agenda[i].task}.`);
      }
    }
  } else if (done == 'desc') {
    for(let i = (agenda.length-1); i > -1; i--){
      if(agenda[i].complete == true){
        console.log(`${i + 1}. ${agenda[i].complete ? '[x]' : '[ ]'} ${agenda[i].task}.`);
      }
    }
  } else {
    console.log("Masukkan data pengurutan tampilan 'asc atau desc'");
  }
  break;

  case 'tag':
  let tag = param.slice(3,4);
  let tagName = param.slice(4).join(',');
  agenda = read();
  agenda[tag-1]["tags"].push(tagName);
  save(agenda);
  console.log(`${tagName} telah ditambahkan ke daftar '${agenda[tag-1].task}'.`);
  break;

  case `filter:${fill}`:
  // console.log(fill);
  agenda = read();
  //console.log(agenda);
  for(let i = 0; i < agenda.length; i++){
    if(agenda[i].tags.includes(fill) == true){
      console.log(`${i + 1}. ${agenda[i].complete ? '[x]' : '[ ]'} ${agenda[i].task}.`);
      }
    }

  break;

  default:
  console.log(">>>  JS TODO  <<<");
  console.log("$ node todo.js <command>");
  console.log("$ node todo.js list");
  console.log("$ node todo.js task <task_id>");
  console.log("$ node todo.js add <task_content>");
  console.log("$ node todo.js delete <task_id>");
  console.log("$ node todo.js complete <task_id>");
  console.log("$ node todo.js uncomplete <task_id>");
  console.log("$ node todo.js list:outstanding asc | desc");
  console.log("$ node todo.js list:completed asc | desc");
  console.log("$ node todo.js tag <task_id> <tag_name_1> <tag_name_2> ... <tag_name_N>");
  console.log("$ node todo.js filter:<tag_name>");
  break;
}
