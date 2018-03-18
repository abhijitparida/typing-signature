var net = new brain.NeuralNetwork();

// config
var training_samples = 2;
var training_string = 'hello world';
var threshold = 0.85;

// training data
var train_data = new Array();

var diff = new Array();
var last = new Date().getTime();
var count = 0;

$('.train-data').attr('placeholder', 'Type \'' + training_string + '\' and press enter');
$('#user1').css('background-color', 'blue');

$('#user1 .train-data').keydown(function(event) {
    var now = new Date().getTime();
    diff.push((now - last)/1000);
    last = now;
    if (event.which === 13) {
        event.preventDefault();
        count++;
        diff.shift();
        if (diff.length === training_string.length) train_data.push({input: diff, output: [1, 0, 0]}); else count--;
        $('#user1 .status').html('Typing samples trained: ' + count + '/' + training_samples);
        diff = new Array();
        $(this).val('');
        if (count === training_samples) {
            count = 0;
            $(this).attr('disabled', true);
            $('#user1').css('background-color', '#ddd');
            $('#user2').css('background-color', 'blue');
            $('#user1 .status').append('<br><span>Neural network trained with user 1\'s typing signature</span>');
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
        if (diff.length === training_string.length) train_data.push({input: diff, output: [0, 1, 0]}); else count--;
        $('#user2 .status').html('Typing samples trained: ' + count + '/' + training_samples);
        diff = new Array();
        $(this).val('');
        if (count === training_samples) {
            count = 0;
            $(this).attr('disabled', true);
            $('#user2').css('background-color', '#ddd');
            $('#user3').css('background-color', 'blue');
            $('#user2 .status').append('<br><span>Neural network trained with user 2\'s typing signature</span>');
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
        if (diff.length === training_string.length) train_data.push({input: diff, output: [0, 0, 1]}); else count--;
        $('#user3 .status').html('Typing samples trained: ' + count + '/' + training_samples);
        diff = new Array();
        $(this).val('');
        if (count === training_samples) {
            count = 0;
            $(this).attr('disabled', true);
            $('#user3').css('background-color', '#ddd');
            $('#userx').css('background-color', 'blue');
            $('#user3 .status').append('<br><span>Neural network trained with user 3\'s typing signature</span>');
            $('#userx .train-data').attr('disabled', false);
            $('#userx .train-data').focus();
            net.train(train_data);
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
        if (result[0] > threshold) {
            max = 1;
        } else if (result[1] > threshold) {
            max = 2;
        } else if (result[2] > threshold) {
            max = 3;
        } else {
            max = 'x';
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
