
jQuery.extend({
	handleError: function( s, xhr, status, e ) {
        // If a local callback was specified, fire it
        if ( s.error )
            s.error( xhr, status, e );
        // If we have some XML response text (e.g. from an AJAX call) then log it in the console
        else if(xhr.responseText)
            console.log(xhr.responseText);
    },

    createUploadIframe: function(id, uri)
	{
			//create frame
            var frameId = 'jUploadFrame_' + id;
            var iframeHtml = '<iframe id="' + frameId + '" name="' + frameId + '" style="position:absolute; top:-9999px; left:-9999px"';
			if(window.ActiveXObject)
			{
                if(typeof uri== 'boolean'){
					iframeHtml += ' src="' + 'javascript:false' + '"';

                }
                else if(typeof uri== 'string'){
					iframeHtml += ' src="' + uri + '"';

                }	
			}
			iframeHtml += ' />';
			jQuery(iframeHtml).appendTo(document.body);

            return jQuery('#' + frameId).get(0);			
    },
    createUploadForm: function(id, fileElementIds, data)
	{
		//create form	
		var formId = 'jUploadForm_' + id;
		var form = jQuery('<form  action="" method="POST" name="' + formId + '" id="' + formId + '" enctype="multipart/form-data"></form>');	
		if(data)
		{
			for(var i in data)
			{
				jQuery('<input type="hidden" name="' + i + '" value="' + data[i] + '" />').appendTo(form);
			}			
		}		
		if(fileElementIds) {
			for(var i in fileElementIds) {
				//console.log("fid : " + fileElementIds[i]);
				var oldElement = jQuery('#' + fileElementIds[i]);
				var newElement = jQuery(oldElement).clone();
				jQuery(oldElement).attr('id', 'jUploadFile_' + fileElementIds[i]);
				jQuery(oldElement).before(newElement);
				jQuery(oldElement).appendTo(form);
			}
		}
		
		//set attributes
		jQuery(form).css('position', 'absolute');
		jQuery(form).css('top', '-1200px');
		jQuery(form).css('left', '-1200px');
		jQuery(form).appendTo('body');		
		return form;
    },

    ajaxFileUpload: function(s) {		
        s = jQuery.extend({}, jQuery.ajaxSettings, s);
        var id = new Date().getTime()        
		var form = jQuery.createUploadForm(id, s.fileElementIds, (typeof(s.data)=='undefined'?false:s.data));
		var io = jQuery.createUploadIframe(id, s.secureuri);
		var frameId = 'jUploadFrame_' + id;
		var formId = 'jUploadForm_' + id;		
        if ( s.global && ! jQuery.active++ )
		{
			jQuery.event.trigger( "ajaxStart" );
		}            
        var requestDone = false;
        var xml = {}   
        if ( s.global )
            jQuery.event.trigger("ajaxSend", [xml, s]);
        var uploadCallback = function(isTimeout)
		{			
			var io = document.getElementById(frameId);
            try 
			{				
				if(io.contentWindow)
				{
					 xml.responseText = io.contentWindow.document.body?io.contentWindow.document.body.innerText:null;
                	 xml.responseXML = io.contentWindow.document.XMLDocument?io.contentWindow.document.XMLDocument:io.contentWindow.document;
					 
				}else if(io.contentDocument)
				{
					 xml.responseText = io.contentDocument.document.body?io.contentDocument.document.body.innerText:null;
                	xml.responseXML = io.contentDocument.document.XMLDocument?io.contentDocument.document.XMLDocument:io.contentDocument.document;
				}	
				
            }catch(e)
			{
				jQuery.handleError(s, xml, null, e);
			}
            
            if ( xml || isTimeout == "timeout") 
			{				
                requestDone = true;
                var status;
                try {
                	
                    status = isTimeout != "timeout" ? "success" : "error";
                    if ( status != "error" )
					{
                    	
                        var data = jQuery.uploadHttpData( xml, s.dataType );    
                        if ( s.success )
                            s.success( data, status );
                        //console.log("xml :  " + xml.responseText + "," + isTimeout);
                        if( s.global )
                            jQuery.event.trigger( "ajaxSuccess", [xml, s] );
                    } else
                        jQuery.handleError(s, xml, status);
                } catch(e) 
				{
                    status = "error";
                    jQuery.handleError(s, xml, status, e);
                }

                if( s.global )
                    jQuery.event.trigger( "ajaxComplete", [xml, s] );

                if ( s.global && ! --jQuery.active )
                    jQuery.event.trigger( "ajaxStop" );

                if ( s.complete )
                    s.complete(xml, status);

                jQuery(io).unbind()

                setTimeout(function()
									{	try 
										{
											jQuery(io).remove();
											jQuery(form).remove();	
											
										} catch(e) 
										{
											jQuery.handleError(s, xml, null, e);
										}									

									}, 100)

                xml = null

            }
        }
        if ( s.timeout > 0 ) 
		{
            setTimeout(function(){
               
                if( !requestDone ) uploadCallback( "timeout" );
            }, s.timeout);
        }
        try 
		{

			var form = jQuery('#' + formId);
			jQuery(form).attr('action', s.url);
			jQuery(form).attr('method', 'POST');
			jQuery(form).attr('target', frameId);
			jQuery(form).attr('accept', "application/json");
            if(form.encoding)
			{
				jQuery(form).attr('encoding', 'multipart/form-data');      			
            }
            else
			{	
				jQuery(form).attr('enctype', 'multipart/form-data');			
            }
		
            jQuery(form).submit();

        } catch(e) 
		{			
            jQuery.handleError(s, xml, null, e);
        }
		
		jQuery('#' + frameId).load(uploadCallback	);
        return {abort: function () {}};	

    },

    uploadHttpData: function( r, type ) {
        var data = !type;
        data = type == "xml" || data ? r.responseXML : r.responseText;
        data = $.trim(data);
        if ( type == "script" )
            jQuery.globalEval( data );
        if ( type == "json" ) {
            eval( "data = " +  data);
        }
        if ( type == "html" )
            jQuery("<div>").html(data).evalScripts();
        //console.log(JSON.stringify(data) + " : " + type);
        return data;
    }
});


var tgCheckFileExts = function(fileElements, fileExts) {
	var fname, fext;
	for(var i=0; i < fileElements.length; i++) {
		fname = $('#'+fileElements[i]).val();
		fext = fname.substring(fname.lastIndexOf('.') + 1).toLowerCase();
		for(var j=0; j < fileExts.length; j++) {
			if(fext==fileExts[j]) {
				return true;
			}
		}
	}
	return false;
};

var tgAjaxUpload = function(url, data, fileElementIds, callback) 
{
	jQuery.ajaxFileUpload({
            url: url,
            secureuri: false,
            fileElementIds: fileElementIds,
            dataType: 'json',
            data: data,
            success: function (data, status) {
                callback.success(data,status);
            },
            error: function (xhr, status, e) {
            	 callback.error(xhr,status,e);
            }
     });          
};       

