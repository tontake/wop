const functions = require('firebase-functions');
const mime = require('mime');
const admin=require('firebase-admin');

const express = require('express');
const app = express();
const {Storage} = require('@google-cloud/storage');
const keyFilename="./my-project-1529147168833-firebase-adminsdk-bnmzp-d181a8ae60.json"; 

//replace this with api key file
const projectId = "my-project-1529147168833"; 

//replace with your project id
const bucketName = 'my-project-1529147168833.appspot.com';
//var serviceAccount = require("path/to/serviceAccountKey.json");
admin.initializeApp(functions.config().firebase);

var db = admin.firestore();





const gcs=new Storage({
    projectId:projectId,
    keyFilename:keyFilename
});

const bucket = gcs.bucket(bucketName);


function createPublicFileURL(storageName) {
    return 'http://storage.googleapis.com/'+bucketName+encodeURIComponent(storageName);

}
app.get('/read', function (req, res) {
var docRef = db.collection('announcements').doc('today');

var setAda = docRef.set({
  id: 2,
  message:'There is a Youth Zonal Starting on the 8th of August ,venue is Northlea High School'
  
});
 db.collection('images').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log( doc.data());
	 
    });
	return;
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });
 
res.send("uploaded to firestore");


});



// respond with "hello world" when a GET request is made to the homepage
app.get('/api', function (req, res) {
  res.json({name:'Tonderai Tagwi',
     occupation:'developer'
  
  });
  console.log('uploaded json file');
  const filePath = './id1.txt';
const uploadTo = '/announcements/id1.txt';
const fileMime = mime.getType(filePath);


bucket.upload(filePath,{
    destination:uploadTo,
    public:true,
    metadata: {contentType:fileMime ,cacheControl: 

"public, max-age=300"}
}, function(err, file) {
    if(err)
    {
        console.log(err);
        return;
    }
    console.log(createPublicFileURL(uploadTo));
});



  
  
});
 exports.app = functions.https.onRequest(app);
