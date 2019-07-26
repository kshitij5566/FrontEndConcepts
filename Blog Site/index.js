$(document).ready(function () {

    $('#get-data').click(function(){
        GetFacebookData();
    })
});// end doc ready


// function to fetch data from json file

let GetAllData = () => {
    console.log('making request');

    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'http://api.open-notify.org/astros.json',
        success: (data) => {
            console.log(data);

            let allPeople = data.people;

            for (people of allPeople) {
                let tempRow = `<div class="row">
                                    <div class="col">${people.name}</div>
                                    <div class="col">${people.craft}</div>
                                </div>`
                $("#showData").append(tempRow);
            }
        },
        error: (data) => {
            console.log(data);
            alert('some error occured');
        },
        beforeSend: () => {//while request is processing
            alert('Request is being made. Please wait......');
        },
        complete: () => {//when request is complete
            alert('Request completed.');
        },
        timeout: 5000
    });// end of ajax call

}// end of getAll method

// function to fetch data from Facebook Graph API

let GetFacebookData = function () {
    let authToken = '';
    authToken = prompt('Please enter your authentication token');
    if (authToken === null || authToken === '') {
        alert('Invalid authentication token.');
    }
    else {

        console.log('Making request to Facebook Graph API.');

        $.ajax({
            type: 'GET',
            dataType: 'json',
            async: true,
            url: 'https://graph.facebook.com/me?fields=id,name,location,gender,link,age_range,picture.type(large)&access_token=' + authToken,
            success: (data) => {
                let facebookUserData = data;
                $('#userName').text(facebookUserData.name);
                $('#location').text(facebookUserData.location.name);
                $('#userProfilePic').attr('src',facebookUserData.picture.data.url);
                $('#fbLink').attr('href',facebookUserData.link);
                
            },
            error: (data) => {

                console.log(data);
            }
        });
    }
}// end of GetFacebookData