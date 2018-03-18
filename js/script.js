var net = new brain.NeuralNetwork();

// training data
var train_data = new Array();

var diff = new Array();
var last = new Date().getTime();
var count = 0;

$('#user1 .train-data').keydown(function(event) {
    var now = new Date().getTime();
    diff.push((now - last)/1000);
    last = now;
    if (event.which === 13) {
        event.preventDefault();
        count++;
        diff.shift();
        if (diff.length == 11) train_data.push({input: diff, output: [1, 0, 0]}); else count--;
        diff = new Array();
        $(this).val('');
        if (count === 5) {
            count = 0;
            $(this).attr('disabled', true);
            $('#user1 .status').html('<span>Neural network trained with user 1\'s typing signature</span>');
            $('#user2 .train-data').attr('disabled', false);
            $('#user2 .train-data').focus();
        }
    }
});


$('#user2 .train-data').keydown(function(event) {
    var now = new Date().getTime();
    diff.push((now - last)/1000);
    last = now;
    if (event.which === 13) {
        event.preventDefault();
        count++;
        diff.shift();
        if (diff.length == 11) train_data.push({input: diff, output: [0, 1, 0]}); else count--;
        diff = new Array();
        $(this).val('');
        if (count === 5) {
            count = 0;
            $('#user2 .status').html('<span>Neural network trained with user 2\'s typing signature</span>');
            $(this).attr('disabled', true);
            $('#user3 .train-data').attr('disabled', false);
            $('#user3 .train-data').focus();
        }
    }
});

$('#user3 .train-data').keydown(function(event) {
    var now = new Date().getTime();
    diff.push((now - last)/1000);
    last = now;
    if (event.which === 13) {
        event.preventDefault();
        count++;
        diff.shift();
        if (diff.length == 11) train_data.push({input: diff, output: [0, 0, 1]}); else count--;
        diff = new Array();
        $(this).val('');
        if (count === 5) {
            count = 0;
            $('#user3 .status').html('<span>Neural network trained with user 3\'s typing signature</span>');
            $(this).attr('disabled', true);
            $('#userx .train-data').attr('disabled', false);
            $('#userx .train-data').focus();
            console.log(net.train(train_data));
        }
    }
});

$('#userx .train-data').keydown(function(event) {
    var now = new Date().getTime();
    diff.push((now - last)/1000);
    last = now;
    if (event.which === 13) {
        event.preventDefault();
        diff.shift();

        var result = net.run(diff);
        var max;
        if (result[0] > result[1] && result[0] > result[2]) {
            max = 1;
        } else if (result[1] > result[0] && result[1] > result[2]) {
            max = 2;
        } else {
            max = 3;
        }

        $('#userx img').attr('src', 'img/' + max + '.png');

        var stats = "Debug data:";
        stats += "<br>User 1: " + (result[0].toFixed(3)*100) + "%";
        stats += "<br>User 2: " + (result[1].toFixed(3)*100) + "%";
        stats += "<br>User 3: " + (result[2].toFixed(3)*100) + "%";

        $('#userx .status').html(stats);

        diff = new Array();
        $(this).val('');
    }
});
