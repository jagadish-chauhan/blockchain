interface MongooseGlobal {
  conn?: string | null;
  promise?: Promise;
}

declare global {

  var mongoose: MongooseGlobal;
  
  namespace NodeJS {
    interface Global {
      mongoose: MongooseGlobal;
      //  document: Document;
      //  window: Window;
      //  navigator: Navigator;
    }
  }
}

// declare global {
//     var mongoose: MongooseGlobal | null;

//     interface Global {
//         mongoose: string
//     }

//     type GlobalType = {
//         mongoose: string
//     }
// }

export { }