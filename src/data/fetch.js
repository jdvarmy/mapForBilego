// function delayer(data) {
//     return function (resolve, reject) {
//         setTimeout(
//             function(){
//                 resolve(data)
//             },
//             2000
//         );
//     }
// }

export function getData() {
    const bilegoMap = {
        "url":"https://spb.bilego.ru/wp-admin/admin-ajax.php",
        "_nonce_":"d0b066cb19",
        "_nonce2_":"ef81313484",
        "_nonce3_":"8bdb077c8b",
        "_tc_nonce_":"d1ec74be0d",
        "map_images":{
            "minimap":["302","https://spb.bilego.ru/wp-content/uploads/2018/08/JFC3mini.svg"],
            "bgmap":["302","https://spb.bilego.ru/wp-content/uploads/2018/08/JFC3mini.svg"],
            "map":["328","https://spb.bilego.ru/wp-content/uploads/2018/08/JFC3.svg"]
        },
        "map_data":{
            "data":{
                "xmlns":"http://www.w3.org/2000/svg",
                "xmlns:svg":"http://www.w3.org/2000/svg",
                "xmlns:rdf":"http://www.w3.org/1999/02/22-rdf-syntax-ns#",
                "version":"1.1","viewBox":"0 0 10240 7680","x":"0px","y":"0px","width":"1024px","height":"768px"
            },
            "elems_path":{
                "path":[
                    {"id":"bar","d":"M 4679.6,6384.8 H 2066.5 c -2.6,0 -4.9,-2.2 -4.9,-4.9 v -469.4 c 0,-2.6 2.2,-4.9 4.9,-4.9 h 2613.2 c 2.6,0 4.9,2.2 4.9,4.9 v 469.4 c -0.2,2.6 -2.4,4.9 -5,4.9 z"},
                    {"id":"stol1","d":"M 3497.3,5551.4 H 2066.5 c -2.6,0 -4.9,-2.2 -4.9,-4.9 v -1431 c 0,-2.6 2.2,-4.9 4.9,-4.9 h 1430.9 c 2.6,0 4.9,2.2 4.9,4.9 v 1430.9 c -0.1,2.8 -2.3,5 -5,5 z"},
                    {"id":"stol2","d":"M 5086.1,5551.4 H 3655.3 c -2.6,0 -4.9,-2.2 -4.9,-4.9 v -1431 c 0,-2.6 2.2,-4.9 4.9,-4.9 h 1430.9 c 2.6,0 4.9,2.2 4.9,4.9 v 1430.9 c -0.1,2.8 -2.2,5 -5,5 z"},
                    {"id":"stol3","d":"M 6743,4867.8 H 5312.2 c -2.6,0 -4.9,-2.2 -4.9,-4.9 V 3432.1 c 0,-2.6 2.2,-4.9 4.9,-4.9 H 6743 c 2.6,0 4.9,2.2 4.9,4.9 V 4863 c 0,2.7 -2.2,4.8 -4.9,4.8 z"},
                    {"id":"stol4","d":"M 8367.6,4867.8 H 6936.8 c -2.6,0 -4.9,-2.2 -4.9,-4.9 V 3432.1 c 0,-2.6 2.2,-4.9 4.9,-4.9 h 1430.9 c 2.6,0 4.9,2.2 4.9,4.9 V 4863 c -0.1,2.7 -2.2,4.8 -5,4.8 z"},
                    {"id":"stol5","d":"M 3697.8,4036.9 H 2266.9 c -2.6,0 -4.9,-2.2 -4.9,-4.9 V 2601.1 c 0,-2.6 2.2,-4.9 4.9,-4.9 h 1430.9 c 2.6,0 4.9,2.2 4.9,4.9 V 4032 c -0.1,2.6 -2.3,4.9 -4.9,4.9 z"},
                    {"id":"stol6","d":"M 5302.4,4036.9 H 3871.6 c -2.6,0 -4.9,-2.2 -4.9,-4.9 V 2601.1 c 0,-2.6 2.2,-4.9 4.9,-4.9 h 1430.9 c 2.6,0 4.9,2.2 4.9,4.9 V 4032 c -0.1,2.6 -2.3,4.9 -5,4.9 z"},
                    {"id":"stol0","d":"m 3060.7,2517.8 h -898.8 c -2.6,0 -4.9,-2.2 -4.9,-4.9 V 1082 c 0,-2.6 2.2,-4.9 4.9,-4.9 h 898.8 c 2.6,0 4.9,2.2 4.9,4.9 v 1430.9 c -0.1,2.7 -2.3,4.9 -4.9,4.9 z"},
                    {"id":"stol7","d":"m 3959,2517.8 h -888.6 c -2.6,0 -4.9,-2.2 -4.9,-4.9 V 1082 c 0,-2.6 2.2,-4.9 4.9,-4.9 H 3959 c 2.6,0 4.9,2.2 4.9,4.9 v 1430.9 c 0,2.7 -2.2,4.9 -4.9,4.9 z"},
                    {"id":"stol8","d":"m 4871.9,2517.8 h -903.1 c -2.6,0 -4.9,-2.2 -4.9,-4.9 V 1082 c 0,-2.6 2.2,-4.9 4.9,-4.9 h 903.1 c 2.6,0 4.9,2.2 4.9,4.9 v 1430.9 c 0,2.7 -2.2,4.9 -4.9,4.9 z"},
                    {"id":"stol9","d":"m 5770.3,2517.8 h -888.6 c -2.6,0 -4.9,-2.2 -4.9,-4.9 V 1082 c 0,-2.6 2.2,-4.9 4.9,-4.9 h 888.6 c 2.6,0 4.9,2.2 4.9,4.9 v 1430.9 c 0,2.7 -2.3,4.9 -4.9,4.9 z"},
                    {"id":"stol10","d":"M 6661.4,2517.8 H 5780 c -2.6,0 -4.9,-2.2 -4.9,-4.9 V 1082 c 0,-2.6 2.2,-4.9 4.9,-4.9 h 881.4 c 2.6,0 4.9,2.2 4.9,4.9 v 1430.9 c 0,2.7 -2.2,4.9 -4.9,4.9 z"},
                    {"id":"stol11","d":"m 7552.6,2517.8 h -881.4 c -2.6,0 -4.9,-2.2 -4.9,-4.9 V 1082 c 0,-2.6 2.2,-4.9 4.9,-4.9 h 881.4 c 2.6,0 4.9,2.2 4.9,4.9 v 1430.9 c -0.1,2.7 -2.3,4.9 -4.9,4.9 z"}
                    ],
                "path_free":[
                    {"id":"free","d":"m 8443.7,2517.8 h -881.4 c -2.6,0 -4.9,-2.2 -4.9,-4.9 V 1082 c 0,-2.6 2.2,-4.9 4.9,-4.9 h 881.4 c 2.6,0 4.9,2.2 4.9,4.9 v 1430.9 c 0,2.7 -2.3,4.9 -4.9,4.9 z"}
                    ]
            },
            "elems_labels":[
                {"sector_id":"stol1","text":"\u0421\u0442\u043e\u043b 1"},
                {"sector_id":"stol2","text":"\u0421\u0442\u043e\u043b 2"},
                {"sector_id":"stol3","text":"\u0421\u0442\u043e\u043b 3"},
                {"sector_id":"stol4","text":"\u0421\u0442\u043e\u043b 4"},
                {"sector_id":"stol5","text":"\u0421\u0442\u043e\u043b 5"},
                {"sector_id":"stol6","text":"\u0421\u0442\u043e\u043b 6"},
                {"sector_id":"stol7","text":"\u0421\u0442\u043e\u043b 7"},
                {"sector_id":"stol8","text":"\u0421\u0442\u043e\u043b 8"},
                {"sector_id":"stol9","text":"\u0421\u0442\u043e\u043b 9"},
                {"sector_id":"stol10","text":"\u0421\u0442\u043e\u043b 10"},
                {"sector_id":"stol11","text":"\u0421\u0442\u043e\u043b 11"},
                {"sector_id":"stol0","text":"\u0421\u0442\u043e\u043b 0"},
                {"sector_id":"bar","text":"\u0411\u0430\u0440"},
                {"sector_id":"free","text":"\u0421\u0432\u043e\u0431\u043e\u0434\u043d\u043e"}
                ],
            // переформировать данные!!!!!!!!!!!!!!!!!
            "elems_seats":[
                {
                    "el":"15",
                    "id":"bar",
                    "comp":"sector",
                    "rows":[{"el":"1","name":"A","comp":"row",
                        "seats":[
                            {"name":"1","comp":"seat","r":"56","cx":"2359.5","cy":"6153.5"},
                            {"name":"2","comp":"seat","r":"56","cx":"2763.3999","cy":"6153.5"},
                            {"name":"3","comp":"seat","r":"56","cx":"3167.3999","cy":"6153.5"},
                            {"name":"4","comp":"seat","r":"56","cx":"3571.3","cy":"6153.5"},
                            {"name":"5","comp":"seat","r":"56","cx":"3975.2","cy":"6153.5"},
                            {"name":"6","comp":"seat","r":"56","cx":"4379.1001","cy":"6153.5"}]}]},
                {
                    "el":"1",
                    "id":"stol1",
                    "comp":"sector",
                    "rows":[{"el":"1","name":"A","comp":"row",
                    "seats":[
                        {"name":"5","comp":"seat","r":"56","cx":"2739.2","cy":"5359.5"},
                        {"name":"4","comp":"seat","r":"56","cx":"3119.7","cy":"5203.6001"},
                        {"name":"3","comp":"seat","r":"56","cx":"3217.2","cy":"4831"},
                        {"name":"2","comp":"seat","r":"56","cx":"3119.7","cy":"4458.5"},
                        {"name":"1","comp":"seat","r":"56","cx":"2739.2","cy":"4302.6001"}]}]},
                {
                    "el":"2",
                    "id":"stol2",
                    "comp":"sector",
                    "rows":[{"el":"1","name":"A","comp":"row",
                    "seats":[
                        {"name":"5","comp":"seat","r":"56","cx":"4307.3999","cy":"5359.5"},
                        {"name":"4","comp":"seat","r":"56","cx":"4687.8999","cy":"5203.6001"},
                        {"name":"3","comp":"seat","r":"56","cx":"4785.3999","cy":"4831"},
                        {"name":"2","comp":"seat","r":"56","cx":"4687.8999","cy":"4458.5"},
                        {"name":"1","comp":"seat","r":"56","cx":"4307.3999","cy":"4302.6001"}]}]},
                {"el":"3","id":"stol3","comp":"sector",
                    "rows":[{"el":"1","name":"A","comp":"row",
                    "seats":[
                        {"name":"6","comp":"seat","r":"56","cx":"5637.7002","cy":"4676"},
                        {"name":"5","comp":"seat","r":"56","cx":"6058.2002","cy":"4676"},
                        {"name":"4","comp":"seat","r":"56","cx":"6438.7002","cy":"4520.2002"},
                        {"name":"3","comp":"seat","r":"56","cx":"6536.2002","cy":"4147.6001"},
                        {"name":"2","comp":"seat","r":"56","cx":"6438.7002","cy":"3775"},
                        {"name":"1","comp":"seat","r":"56","cx":"6058.2002","cy":"3619.1001"}]}]},
                {"el":"4","id":"stol4","comp":"sector",
                    "rows":[{"el":"1","name":"A","comp":"row",
                    "seats":[
                        {"name":"6","comp":"seat","r":"56","cx":"7245","cy":"4676"},
                        {"name":"5","comp":"seat","r":"56","cx":"7665.5","cy":"4676"},
                        {"name":"4","comp":"seat","r":"56","cx":"8045.8999","cy":"4520.2002"},
                        {"name":"3","comp":"seat","r":"56","cx":"8143.3999","cy":"4147.6001"},
                        {"name":"2","comp":"seat","r":"56","cx":"8045.8999","cy":"3775"},
                        {"name":"1","comp":"seat","r":"56","cx":"7665.5","cy":"3619.1001"}]}]},
                {"el":"5","id":"stol5","comp":"sector",
                    "rows":[{"el":"1","name":"A","comp":"row",
                    "seats":[
                        {"name":"4","comp":"seat","r":"56","cx":"3027","cy":"3827.3999"},
                        {"name":"3","comp":"seat","r":"56","cx":"3407.5","cy":"3671.5"},
                        {"name":"2","comp":"seat","r":"56","cx":"3407.5","cy":"2926.3"},
                        {"name":"1","comp":"seat","r":"56","cx":"3027","cy":"2770.5"}]}]},
                {"el":"6","id":"stol6","comp":"sector",
                    "rows":[{"el":"1","name":"A","comp":"row",
                    "seats":[
                        {"name":"4","comp":"seat","r":"56","cx":"4631.2002","cy":"3827.3999"},
                        {"name":"3","comp":"seat","r":"56","cx":"5011.7998","cy":"3671.5"},
                        {"name":"2","comp":"seat","r":"56","cx":"5011.7998","cy":"2926.3"},
                        {"name":"1","comp":"seat","r":"56","cx":"4631.2002","cy":"2770.5"}]}]},
                {"el":"0","id":"stol0","comp":"sector",
                    "rows":[{"el":"1","name":"A","comp":"row",
                    "seats":[
                        {"name":"1","comp":"seat","r":"56","cx":"2359.5","cy":"1269.3"},
                        {"name":"2","comp":"seat","r":"56","cx":"2887.7","cy":"1269.3"},
                        {"name":"3","comp":"seat","r":"56","cx":"2623.6001","cy":"2326"}]}]},
                {"el":"7","id":"stol7","comp":"sector",
                    "rows":[{"el":"1","name":"A","comp":"row",
                    "seats":[
                        {"name":"1","comp":"seat","r":"56","cx":"3257.8999","cy":"1269"},
                        {"name":"2","comp":"seat","r":"56","cx":"3786.1001","cy":"1269"},
                        {"name":"3","comp":"seat","r":"56","cx":"3522","cy":"2325.8999"}]}]},
                {"el":"8","id":"stol8","comp":"sector",
                    "rows":[{"el":"1","name":"A","comp":"row",
                    "seats":[
                        {"name":"1","comp":"seat","r":"56","cx":"4156.2998","cy":"1269"},
                        {"name":"2","comp":"seat","r":"56","cx":"4684.3999","cy":"1269"},
                        {"name":"3","comp":"seat","r":"56","cx":"4684.3999","cy":"2325.8999"},
                        {"name":"4","comp":"seat","r":"56","cx":"4156.2998","cy":"2325.8999"}]}]},
                {"el":"9","id":"stol9","comp":"sector",
                    "rows":[{"el":"1","name":"A","comp":"row",
                    "seats":[
                        {"name":"1","comp":"seat","r":"56","cx":"5054.7002","cy":"1269"},
                        {"name":"2","comp":"seat","r":"56","cx":"5582.7998","cy":"1269"},
                        {"name":"3","comp":"seat","r":"56","cx":"5318.7002","cy":"2325.8999"}]}]},
                {"el":"10","id":"stol10","comp":"sector",
                    "rows":[{"el":"1","name":"A","comp":"row",
                    "seats":[
                        {"name":"1","comp":"seat","r":"56","cx":"5953","cy":"1269"},
                        {"name":"2","comp":"seat","r":"56","cx":"6481.2002","cy":"1269"},
                        {"name":"3","comp":"seat","r":"56","cx":"6481.2002","cy":"2325.8999"},
                        {"name":"4","comp":"seat","r":"56","cx":"5953","cy":"2325.8999"}]}]},
                {"el":"11","id":"stol11","comp":"sector",
                    "rows":[{"el":"1","name":"A","comp":"row",
                    "seats":[
                        {"name":"1","comp":"seat","r":"56","cx":"6851.3999","cy":"1269"},
                        {"name":"2","comp":"seat","r":"56","cx":"7379.6001","cy":"1269"},
                        {"name":"3","comp":"seat","r":"56","cx":"7115.5","cy":"2325.8999"}]}]},
                {"el":"12","id":"free","comp":"sector",
                    "rows":[{"el":"1","name":"A","comp":"row",
                    "seats":[{"name":"free-seat","comp":"seat","r":"56","cx":"8010","cy":"1799"}]}]}
            ]
        },
        "post_id":1447,
        "t_type":"with_map",
        "tc_event_id":"",
        "tc_event_map":"",
        "load_img":"https://spb.bilego.ru/wp-content/uploads/loadings/loading-v1.png",
        "event_type":"b_map",
        "type":"map" // set
    };

    // return new Promise(delayer(bilegoMap));

    return new Promise(
        (resolve, reject)=>setTimeout( ()=>resolve(bilegoMap), 2000 )
        )
}
