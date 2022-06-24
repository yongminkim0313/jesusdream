const temp = "./temp/";
const uploadFile = "./uploadFile/";
const fs = require('fs');

module.exports = (socket) => {
    socket.on('fileDel', () => {
        socket.broadcast.emit('fileCommend', { fileCommend: 'refresh' });
        socket.emit('fileCommend', { fileCommend: 'refresh' });
    });

    var Files = Object();
    socket.on('Start', (data) => {
        console.log('socket start!!');
        var Name = data.Name;
        Files[Name] = {
            FileSize: data.Size,
            Data: "",
            Downloaded: 0
        };
        var Place = 0;
        fs.appendFileSync(temp + Name, "");
        var Stat = fs.statSync(temp + Name);
        if (Stat.isFile()) {
            Files[Name].Downloaded = Stat.size;
        }
        fs.open(temp + Name, "a+", function(err, fd) {
            if (err) console.log(err);
            else {
                Files[Name].Handler = fd;
                socket.emit('MoreData', { 'Place': Place, Percent: 0 });
            }
        });
    });

    socket.on('Upload', (data) => {
        var Name = data.Name;
        Files[Name].Downloaded += data.Data.length;
        Files[Name].Data += data.Data;
        if (Files[Name].Downloaded == Files[Name].FileSize) {
            var atchmnflNm = Name;
            fs.write(Files[Name].Handler, Files[Name].Data, null, 'Binary', function(err, written) {

                if (err) console.log(err);
                var readable = fs.createReadStream(temp + Name);
                var writable = fs.createWriteStream(uploadFile + atchmnflNm);
                readable.pipe(writable);
                writable.on('finish', function(err) {
                    if (err) console.log(err);
                    console.log(atchmnflNm + " : writing is completed.");
                    fs.close(Files[Name].Handler, function(err) {
                        if (err) console.log(err, Files);
                        fs.unlink(temp + Name, function(err) {
                            if (err) console.log(err);
                            socket.emit('endData', { 'Place': Place, 'Percent': 100 });
                            console.log(Name + " is deleted.");
                        });
                    });
                });
            });
        } else if (Files[Name].Data.length > 10485760) {
            fs.write(Files[Name].Handler, Files[Name].Data, null, 'Binary', function(err, written) {
                Files[Name].Data = ""; //Reset The Buffer
                var Place = Files[Name].Downloaded / 524288;
                var Percent = (Files[Name].Downloaded / Files[Name].FileSize) * 100;
                socket.emit('MoreData', { 'Place': Place, 'Percent': Percent });
            });
        } else {
            var Place = Files[Name].Downloaded / 524288;
            var Percent = (Files[Name].Downloaded / Files[Name].FileSize) * 100;
            socket.emit('MoreData', { 'Place': Place, 'Percent': Percent });
        }
    });

}