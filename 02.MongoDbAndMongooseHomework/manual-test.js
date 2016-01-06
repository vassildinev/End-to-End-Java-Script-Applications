(function(){
    "use strict";

    var chatDb = require('./services/chat-db.js');

    // Asynchronous JS for you!
    chatDb.registerUser({
        username: 'Vasil.Vasilev',
        pass: 123456
    }).then(function(){
        chatDb.registerUser({
            username: 'Viktor.Viktorov',
            pass: 123456
        }).then(function(){
            chatDb.registerUser({
                username: 'Ivo.Ivov',
                pass: 123456
            }).then(function(){
                chatDb.sendMessage({
                    from: 'Vasil.Vasilev',
                    to: 'Viktor.Viktorov',
                    text: 'V akademiqta sym'
                }).then(function(){
                    chatDb.sendMessage({
                        from: 'Viktor.Viktorov',
                        to: 'Vasil.Vasilev',
                        text: 'Dooobre'
                    }).then(function(){
                        chatDb.getMessages({
                            with: 'Vasil.Vasilev',
                            and: 'Viktor.Viktorov'
                        });
                    });
                })
            })
        })
    });
}());