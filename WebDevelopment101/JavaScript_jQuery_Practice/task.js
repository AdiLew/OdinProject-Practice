var 
	gridDimDefault=16,
	gridSqDefault = $('<div class="grid-square"></div>'),
	gridRowDefault = $('<div class="grid-row"></div>'),
	containerDefault=$('<div id="container"></div>'),
	
	gridSq=gridSqDefault.clone(),
	gridRow=gridRowDefault.clone(),
	container=containerDefault.clone();

$(document).on('ready',function(){
	createGrid(gridDimDefault);
		
});	


		
$('.clear-btn').on('click',function(){



	var gridDim;
	resetPrompt();
	$('.overlay').on('click',function(){$(this).remove(); return;})
	
	$('#input-submit').on('click',function(){
		if(!($(this).prop('disabled'))){
			gridDim = parseInt($('#input-gridSize').val());
			
			$('#container').remove();
			initializeObjects();
			createGrid(gridDim);
			$('.overlay').remove();
		}
	})
	
	

	
})	

function createGrid(gridDim){	


	
	for (var i=0 ; i<gridDim ; i++){
		var gridCell = gridSq.clone().data('x',i);
		$(gridRow).append(gridCell);

	}
	for (var j=0 ; j<gridDim ; j++){
		var newGridRow = gridRow.clone().data('y',j);
		newGridRow.find('.grid-square').data('y',j);
		container.append(newGridRow);
	}
	

		
	$('body').append(container);
	$('#container .grid-row').css({'height':100/gridDim+'%'});
	$('#container .grid-square').css({'width':100/gridDim+'%'});

	$('#container').on('mouseenter','.grid-square',function(){
		
	if($(this).hasClass('highlight')){
		var opacity = Math.max(parseFloat($(this).css('opacity'))-0.1,0);
		$(this).css({'opacity':opacity});
	}
	
	else {
		$(this).addClass('highlight').css({'background-color':randomColor()});
		
	}
})

}

function askForgridSize(){
	var size=prompt('Please add grid dimension:',gridDimDefault);
	if (!(size>0)){
		askForgridSize();
	}
	else return parseInt(size);
}

function initializeObjects(){
	gridSq=gridSqDefault.clone(),
	gridRow=gridRowDefault.clone(),
	container=containerDefault.clone();
}

function randomColor (){
	var color = '#';
	letters = '0123456789ABCDEF';
	
	for(var i=0 ; i<6 ; i++){
		color+=letters[Math.floor(Math.random()*16)];
	}
	
	return (color);
	
}

function resetPrompt(){
	var overlay = $('<div class="overlay"></div>'),
		promptMessage = $('<div class="reset-prompt"><h2>Please add grid dimension:</h2><input id="input-gridSize" name="gridSize" type="number" value="16"/><input id="input-submit" name="ok" type="submit" value="Do it!"/></div>');
	
	overlay.append(promptMessage)
	$('body').append(overlay);
	$('.overlay').on('click',function(){$(this).remove()})
	$('.reset-prompt').on('click',function(event){
		event.stopPropagation();
	})
	
	$('#input-gridSize').on('keyup',function(){
		debugger;
		if (! (parseInt($(this).val()))>0){
			$('#input-submit').prop('disabled',true);
		}
		else {
			$('#input-submit').prop('disabled',false);
		}
	})
	
	
}