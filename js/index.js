$(document).ready(function() {
    $('.randomizeBtn').click( function(e) {

        $(".welcome").addClass('hiding');
     
        $(".searching").addClass('showing');

        $.ajax({
            url: "https://www.themealdb.com/api/json/v1/1/random.php", 
            success: function(result){
                   
                let data = result.meals[0];
                setTitle(data);
                setDetails(data);
                setIngredients(data);
                setHowTo(data);

                $(".welcomeScreen").addClass('hiding');

                setTimeout(function(){
                $(".welcomeScreen").hide();
                $(".foodScreen").addClass('showing2');
                $(".foodScreen").show();
                }, 1000);

              }
        });

    });

    function setTitle(data){
        let html = '';
        html += '<h5>'+data.strArea+' Food  </h5><h2 style="font-size: 2.5em;">'+data.strMeal+'</h2>';
        $('.title').html(html);
    };

    function setDetails(data){
        let html = '';
        html += '<img class="imageFood" src="'+ data.strMealThumb +'">';
        
        if(data.strTags){
            let tags = data.strTags.split(',');
            html += '<br>';
            tags.forEach(tag => {
                html += '<span class="badge badge-info">'+tag+'</span>';
            });
        }
        $('.details').html(html);
    };

    function setIngredients(data){
        let html = '';
        html += '<h2 style="font-size: 1.5em;">INGREDIENTS</h2><br><br>';

        for(var i = 1; i <= 20; i++){
            if(data['strIngredient'+i]){
                html += '<p>- ';
                html += data['strMeasure'+i] + ' of ' + data['strIngredient'+i]+'</p>';
            }   
        }

        $('.ingredients').html(html);
    };

    function setHowTo(data){
        
        let html = '';
        html += '<h2>INSTRUCTIONS</h2> <br> <p>' + data.strInstructions + '</p>';

        $('.howTo').html(html);

    };
});