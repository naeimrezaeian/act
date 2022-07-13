const express = require('express')
const fs = require("fs");
const fileUpload = require('express-fileupload');
//const Routers = require ('./Routers');
var cors = require('cors')

const app = express()
//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cors())



 
   app.get('/',(req,res)=>{    res.sendStatus(200)  })

   app.post('/test', async function (req, res) {  
   
      res.status(200).json({data:{msg:"test json post"}})

   })
   app.post('/examAnswer', async function (req, res) { 
  
    let answers=[1001,1002,1003,1004,0,0,0,0,0]
    res.status(200).json({answers:answers})

 })





app.get("/login",(req,res)=>{
const login ={      
  "message": "success",
  "token": "fsdfsd435dswfsdkljdfkjashjfasd",
 
  "user": {
    "id": 1,
    "name": "Иван",
    "family": "иванович",
    "father": "иванов"
  },
  "exam": {
    "levelid": 1,
    "levelTitle": "Вид на жительство"
    ,     
  "module": [
    {
      "id": 1,
      "title": "Русский язык",
      "subtest":[
        {"id":1001,"title":"Лексика и грамматика","status":1,"maxtime":20,"maxscore":50},
        {"id":1002,"title":"Чтение","status":0,"maxtime":20,"maxscore":50},
        {"id":1003,"title":"Письмо","status":0,"maxtime":20,"maxscore":50},
        {"id":1004,"title":"Говорение","status":0,"maxtime":20,"maxscore":50}
      ]
    },
    {
      "id": 2,
      "title": "История России",
      "subtest":[
        {"id":1005,"title":"История россии","status":0}          
      ]
    },
    {
      "id": 3,
      "title": "Законодательство РФ",
      "subtest":[
        {"id":1006,"title":"Законодательство","status":0}          
      ]
    }
  ]
  ,
  "currentState":{
    "moduleId":1,"subtestId":1001,"questionId":0,"start":"12:00:00","record":true
  }
  
}}

res.status(200).json(login)

})

app.get("/levels/:id",(req,res)=>{
  

  const levels=[
    {"id":1,"title":"Вид на жительство","desc":"<p><b>Вид на жительство Российской Федерации</b> — документ, подтверждающий право на долгосрочное проживание на территории Российской Федерации лица, не являющегося гражданином Российской Федерации — то есть иностранного гражданина либо лица без гражданства.</p><p>Экзамен состоит из <b>3 основных и 2 дополнительных модулей</b>.</p><p>Каждый из основных и дополнительных модулей может сдаваться отдельно, не зависимо от прохождения других модулей.</p><p><b>Каждый модуль состоит из 80 вопросов и продолжается 1 час 20 минут.</b></p><p>Типы заданий: подобрать пары, выбрать правильный ответ из трёх предложенных, найти лишнее.</p><p>За каждый правильный ответ даётся один балл.</p>"}
   ,{"id":2,"title":"Вид на жительство 2","desc":"<p><b>Вид на жительство Российской Федерации</b> — документ, подтверждающий право на долгосрочное проживание на территории Российской Федерации лица, не являющегося гражданином Российской Федерации — то есть иностранного гражданина либо лица без гражданства.</p><p>Экзамен состоит из <b>3 основных и 2 дополнительных модулей</b>.</p><p>Каждый из основных и дополнительных модулей может сдаваться отдельно, не зависимо от прохождения других модулей.</p><p><b>Каждый модуль состоит из 80 вопросов и продолжается 1 час 20 минут.</b></p><p>Типы заданий: подобрать пары, выбрать правильный ответ из трёх предложенных, найти лишнее.</p><p>За каждый правильный ответ даётся один балл.</p>"}

]
console.log(levels[req.params.id])
res.status(200).json(levels[req.params.id])
})


app.get("/subtests/:id",(req,res)=>{

  const subtests=[
    {"id":1001,"title":"Лексика и грамматика","desc":"<b>Лексика и грамматика</b><br><p><b>Лексика представляет собой совокупность слов, а грамматика характеризует закономерности построения предложений, грамматический строй языка.</b></p><p>Очень часто изучение иностранного языка становится срочной необходимостью, вызванной, к примеру, новой работой или приближающейся поездкой за рубеж. Многие из тех, кто оказался в такой ситуации вполне резонно задаются вопросом выбора приоритетов в обучении. Что важнее лексика или грамматика? Чему уделить большее внимания для того, чтобы быстрее освоить языки испытывать меньше затруднений с разговорной речью?</p>"},
    {"id":1002,"title":"Чтение","desc":"<b>Чтение</b><br><p><b>Лексика представляет собой совокупность слов, а грамматика характеризует закономерности построения предложений, грамматический строй языка.</b></p><p>Очень часто изучение иностранного языка становится срочной необходимостью, вызванной, к примеру, новой работой или приближающейся поездкой за рубеж. Многие из тех, кто оказался в такой ситуации вполне резонно задаются вопросом выбора приоритетов в обучении. Что важнее лексика или грамматика? Чему уделить большее внимания для того, чтобы быстрее освоить языки испытывать меньше затруднений с разговорной речью?</p>"},
    {"id":1003,"title":"Письмо","desc":"<b>Письмо</b><br><b>Лексика представляет собой совокупность слов, а грамматика характеризует закономерности построения предложений, грамматический строй языка.</b></p><p>Очень часто изучение иностранного языка становится срочной необходимостью, вызванной, к примеру, новой работой или приближающейся поездкой за рубеж. Многие из тех, кто оказался в такой ситуации вполне резонно задаются вопросом выбора приоритетов в обучении. Что важнее лексика или грамматика? Чему уделить большее внимания для того, чтобы быстрее освоить языки испытывать меньше затруднений с разговорной речью?</p>"},
    {"id":1004,"title":"Говорение","desc":"<b>Говорение</b><br><b>Лексика представляет собой совокупность слов, а грамматика характеризует закономерности построения предложений, грамматический строй языка.</b></p><p>Очень часто изучение иностранного языка становится срочной необходимостью, вызванной, к примеру, новой работой или приближающейся поездкой за рубеж. Многие из тех, кто оказался в такой ситуации вполне резонно задаются вопросом выбора приоритетов в обучении. Что важнее лексика или грамматика? Чему уделить большее внимания для того, чтобы быстрее освоить языки испытывать меньше затруднений с разговорной речью?</p>"},
    {"id":1005,"title":"История россии","desc":"<b>История россии</b><br><b>Лексика представляет собой совокупность слов, а грамматика характеризует закономерности построения предложений, грамматический строй языка.</b></p><p>Очень часто изучение иностранного языка становится срочной необходимостью, вызванной, к примеру, новой работой или приближающейся поездкой за рубеж. Многие из тех, кто оказался в такой ситуации вполне резонно задаются вопросом выбора приоритетов в обучении. Что важнее лексика или грамматика? Чему уделить большее внимания для того, чтобы быстрее освоить языки испытывать меньше затруднений с разговорной речью?</p>"},
    {"id":1006,"title":"Законодательство","desc":"<b>Законодательство</b><br><b>Лексика представляет собой совокупность слов, а грамматика характеризует закономерности построения предложений, грамматический строй языка.</b></p><p>Очень часто изучение иностранного языка становится срочной необходимостью, вызванной, к примеру, новой работой или приближающейся поездкой за рубеж. Многие из тех, кто оказался в такой ситуации вполне резонно задаются вопросом выбора приоритетов в обучении. Что важнее лексика или грамматика? Чему уделить большее внимания для того, чтобы быстрее освоить языки испытывать меньше затруднений с разговорной речью?</p>"}
  ]
  res.status(200).json(subtests[0])
})

   app.get('/questions',(req,res)=>{    

    const q_text=[
        {"id":5001,"type":"text","desc":"Выберите правильный вариант. Прочитайте сообщения и найдите логическое продолжение этой информации в вариантах","question":"1-Теперь во все столичные аэропорты можно быстро доехать на электричке из центра Москвы:",
          "answers":[
            {"id":2002,"answer":"Например, в московский аэропорт «Внуково» вы доберетесь с Киевского вокзала всего за 30 минут."},
            {"id":2003,"answer":"Московское метро — самый удобный и быстрый вид городского транспорта."},
            {"id":2004,"answer":"Самый большой аэропорт в Москве — это аэропорт «Домодедово»."}
          ]},
          {"id":5002,"type":"text","desc":"Выберите правильный вариант. Прочитайте сообщения и найдите логическое продолжение этой информации в вариантах","question":"2-Теперь во все столичные аэропорты можно быстро доехать на электричке из центра Москвы:",
            "answers":[
              {"id":2005,"answer":"2Например, в московский аэропорт «Внуково» вы доберетесь с Киевского вокзала всего за 30 минут."},
              {"id":2006,"answer":"2Московское метро — самый удобный и быстрый вид городского транспорта."},
              {"id":2007,"answer":"2Самый большой аэропорт в Москве — это аэропорт «Домодедово»."},
              {"id":2008,"answer":"2Самый большой аэропорт в Москве — это аэропорт «Домодедово»."}
            ]},
            {"id":5002,"type":"text","desc":"Выберите правильный вариант. Прочитайте сообщения и найдите логическое продолжение этой информации в вариантах","question":"3-Теперь во все столичные аэропорты можно быстро доехать на электричке из центра Москвы:",
              "answers":[
                {"id":2005,"answer":"2Например, в московский аэропорт «Внуково» вы доберетесь с Киевского вокзала всего за 30 минут."},
                {"id":2006,"answer":"2Московское метро — самый удобный и быстрый вид городского транспорта."},
                {"id":2007,"answer":"2Самый большой аэропорт в Москве — это аэропорт «Домодедово»."},
                {"id":2008,"answer":"2Самый большой аэропорт в Москве — это аэропорт «Домодедово»."}
              ]},
              {"id":5002,"type":"text","desc":"Выберите правильный вариант. Прочитайте сообщения и найдите логическое продолжение этой информации в вариантах","question":"4-Теперь во все столичные аэропорты можно быстро доехать на электричке из центра Москвы:",
                "answers":[
                  {"id":2005,"answer":"2Например, в московский аэропорт «Внуково» вы доберетесь с Киевского вокзала всего за 30 минут."},
                  {"id":2006,"answer":"2Московское метро — самый удобный и быстрый вид городского транспорта."},
                  {"id":2007,"answer":"2Самый большой аэропорт в Москве — это аэропорт «Домодедово»."},
                  {"id":2008,"answer":"2Самый большой аэропорт в Москве — это аэропорт «Домодедово»."}
                ]},
                {"id":5002,"type":"text","desc":"Выберите правильный вариант. Прочитайте сообщения и найдите логическое продолжение этой информации в вариантах","question":"5-Теперь во все столичные аэропорты можно быстро доехать на электричке из центра Москвы:",
                  "answers":[
                    {"id":2005,"answer":"2Например, в московский аэропорт «Внуково» вы доберетесь с Киевского вокзала всего за 30 минут."},
                    {"id":2006,"answer":"2Московское метро — самый удобный и быстрый вид городского транспорта."},
                    {"id":2007,"answer":"2Самый большой аэропорт в Москве — это аэропорт «Домодедово»."},
                    {"id":2008,"answer":"2Самый большой аэропорт в Москве — это аэропорт «Домодедово»."}
                  ]}
      ]

      const q_letter=[
        {"id":6001,"type":"letter","desc":"Прочитайте текст и ответьте на вопрос на выданной форме:",
          "question":"1 <p>Красная площадь в Москве – самая известная и символичная. История Красной площади началась в конце 15 — начале 16 века (ориентировочно 1493 год), когда перед стеной Кремля была расчищена полоса просматриваемого пространства, которая достигала в ширину около 240 метров. Причинами обустройства площади историки называют необходимость расширить торговые пространства Москвы, а также обеспечить безопасность важной составляющей города – Кремля.</p><p>Вначале эта площадь больше походила на рыночную, и называлась Торг, Пожар, а уже во второй половине 17 века площадь стали называть Красной, что означало красивая.</p><p>Самая распространенная версия гласит, что в 1493 году Иван III издал указ, согласно которому все деревянные постройки у стен Кремля должны быть снесены, т.к. они создавали потенциальную опасность пожаров. В результате исполнения этого приказа и появилась площадь-предшественница Красной площади. На площади развернулась мелкая торговля, а со временем стали вновь возводиться деревянные дома, которые периодически сносили. Деревянные постройки продолжали страдать от пожаров, поэтому и площадь стали называть Пожар.</p><p>Самым древним сооружением Красной площади, которое есть и сейчас, было Лобное место, которое находилось на развилке напротив Спасской кремлевской башни. Первое упоминание о нем встречается в документах 1547 года. На Лобном месте стоял деревянный помост, с которого оглашались царские указы, позже, в 1597-1598 годах, деревянный помост заменили каменным.</p>"    
        },
        {"id":6002,"type":"letter","desc":"Прочитайте текст и ответьте на вопрос на выданной форме:",
          "question":"2 <p>Красная площадь в Москве – самая известная и символичная. История Красной площади началась в конце 15 — начале 16 века (ориентировочно 1493 год), когда перед стеной Кремля была расчищена полоса просматриваемого пространства, которая достигала в ширину около 240 метров. Причинами обустройства площади историки называют необходимость расширить торговые пространства Москвы, а также обеспечить безопасность важной составляющей города – Кремля.</p><p>Вначале эта площадь больше походила на рыночную, и называлась Торг, Пожар, а уже во второй половине 17 века площадь стали называть Красной, что означало красивая.</p><p>Самая распространенная версия гласит, что в 1493 году Иван III издал указ, согласно которому все деревянные постройки у стен Кремля должны быть снесены, т.к. они создавали потенциальную опасность пожаров. В результате исполнения этого приказа и появилась площадь-предшественница Красной площади. На площади развернулась мелкая торговля, а со временем стали вновь возводиться деревянные дома, которые периодически сносили. Деревянные постройки продолжали страдать от пожаров, поэтому и площадь стали называть Пожар.</p><p>Самым древним сооружением Красной площади, которое есть и сейчас, было Лобное место, которое находилось на развилке напротив Спасской кремлевской башни. Первое упоминание о нем встречается в документах 1547 года. На Лобном месте стоял деревянный помост, с которого оглашались царские указы, позже, в 1597-1598 годах, деревянный помост заменили каменным.</p>"    
        },
        {"id":6003,"type":"letter","desc":"Прочитайте текст и ответьте на вопрос на выданной форме:",
          "question":"1 <p>Красная площадь в Москве – самая известная и символичная. История Красной площади началась в конце 15 — начале 16 века (ориентировочно 1493 год), когда перед стеной Кремля была расчищена полоса просматриваемого пространства, которая достигала в ширину около 240 метров. Причинами обустройства площади историки называют необходимость расширить торговые пространства Москвы, а также обеспечить безопасность важной составляющей города – Кремля.</p><p>Вначале эта площадь больше походила на рыночную, и называлась Торг, Пожар, а уже во второй половине 17 века площадь стали называть Красной, что означало красивая.</p><p>Самая распространенная версия гласит, что в 1493 году Иван III издал указ, согласно которому все деревянные постройки у стен Кремля должны быть снесены, т.к. они создавали потенциальную опасность пожаров. В результате исполнения этого приказа и появилась площадь-предшественница Красной площади. На площади развернулась мелкая торговля, а со временем стали вновь возводиться деревянные дома, которые периодически сносили. Деревянные постройки продолжали страдать от пожаров, поэтому и площадь стали называть Пожар.</p><p>Самым древним сооружением Красной площади, которое есть и сейчас, было Лобное место, которое находилось на развилке напротив Спасской кремлевской башни. Первое упоминание о нем встречается в документах 1547 года. На Лобном месте стоял деревянный помост, с которого оглашались царские указы, позже, в 1597-1598 годах, деревянный помост заменили каменным.</p>"    
        }
      
      ]

      const q_audio =[
        {"id":6001,"type":"audio","file":"file1.mp3","desc":"Прослушайте аудио файл и беседуете с преподавателем:","question":"1-Теперь во все","limit":2,
        "answers":[
          {"id":1001,"answer":"11111111111111111"},
          {"id":1002,"answer":"22222222222222222"},
          {"id":1003,"answer":"33333333333333333"},
          {"id":1004,"answer":"44444444444444444"}
        ]
        },
        {"id":6001,"type":"audio","file":"file1.mp3","desc":"Прослушайте аудио файл и беседуете с преподавателем:","question":"2-Теперь во все gfsdgfdgdfgfd","limit":2,
          "answers":[
            {"id":1001,"answer":"11111111111111111  aaaaa "},
            {"id":1002,"answer":"22222222222222222  bbbbb "},
            {"id":1003,"answer":"33333333333333333  cccc"},
            {"id":1004,"answer":"44444444444444444  dddd"}
          ]
          },
          {"id":6001,"type":"audio","file":"file1.mp3","desc":"Прослушайте аудио файл и беседуете с преподавателем:","question":"2-Теперь во все gfsdgfdgdfgfd","limit":2,
            "answers":[
              {"id":1001,"answer":"11111111111111111  aaaaa "},
              {"id":1002,"answer":"22222222222222222  bbbbb "},
              {"id":1003,"answer":"33333333333333333  cccc"},
              {"id":1004,"answer":"44444444444444444  dddd"}
            ]
            }
  
      ]
      
      const q_video =[
        {"id":6001,"type":"video","file":"file2.mp4","desc":"Прослушайте аудио файл и беседуете с преподавателем:","question":"1-- поздоровайтесь и спросите, может ли продавец помочь Вам;<br>- объясните ему, в какую комнату / на кухню / Вы хотите купить мебель;<br>- объясните, какая мебель Вам нужна:<br>• страна-производитель (объясните, почему),<br>• материал, из которого изготовлена мебель (объясните, почему),<br>• стоимость мебели,<br>• предметы мебели;<br>- выберите мебель и договоритесь о доставке;<br>- поблагодарите и попрощайтесь.","limit":2,
        "answers":[
          {"id":1001,"answer":"11111111111111111"},
          {"id":1002,"answer":"22222222222222222"},
          {"id":1003,"answer":"33333333333333333"},
          {"id":1004,"answer":"44444444444444444"}
        ]
      },
      {"id":6001,"type":"video","file":"file2.mp4","desc":"Прослушайте аудио файл и беседуете с преподавателем:","question":"2-Теперь во все","limit":2,
      "answers":[
        {"id":1001,"answer":"11111111111111111"},
        {"id":1002,"answer":"22222222222222222"},
        {"id":1003,"answer":"33333333333333333"},
        {"id":1004,"answer":"44444444444444444"}
      ]
    },
    {"id":6001,"type":"video","file":"file2.mp4","desc":"Прослушайте аудио файл и беседуете с преподавателем:","question":"3-Теперь во все","limit":2,
    "answers":[
      {"id":1001,"answer":"11111111111111111"},
      {"id":1002,"answer":"22222222222222222"},
      {"id":1003,"answer":"33333333333333333"},
      {"id":1004,"answer":"44444444444444444"}
    ]
  }
    ]
      res.status(200).json(q_video)
   

})

  
 
  app.post('/upload',(req,res)=>{
    
    
  var fileName="test.webm"
  var fileBuffer=req.files.file.data
   console.log(req.files.file)
    
    fs.appendFile(fileName, fileBuffer, function (err) {
     if (err) throw err;
     console.log('Saved!');
    });
   
   
   //fs.createWriteStream("./public/uploads/"+fileName).write(fileBuffer);
    res.status(201).json({"status":"ok"})

  })

  app.get("/video", function (req, res) {
    const range = req.headers.range;
    if (!range) {
        res.status(400).send("Requires Range header");
    }
    const videoPath = "./public/uploads/file1.mp4";
    const videoSize = fs.statSync(videoPath).size;
    
    const CHUNK_SIZE = 10 ** 6;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };
    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
});


  app.listen(4000, () => {
  console.log('Server is listening on Port: 4000')
})
