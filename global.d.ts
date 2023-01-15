interface MongooseGlobal {
  conn?: string;
  promise?: Promise;
}


declare global {
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