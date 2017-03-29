KangoAPI.onReady(function() {

	var estimated_total_cost_per_month = 0;

	kango.console.log('Loading popup.');

	if (kango.storage.getItem('do_manager_personal_access_token') == null)
	{
		kango.ui.optionsPage.open();

		$("#loading_bar").hide();
		$("#api_failed").hide();
		$("#api_failed_options_opened").show();
		$("#edit_options").click(function(){
			kango.ui.optionsPage.open();
		});
	}
	else
	{
		kango.dispatchMessage('refresh_api_cache', true);

		var details = {
	        method: 'GET',
	        url: 'https://api.digitalocean.com/v2/droplets',
	        async: true,
			headers: {'Authorization': 'Bearer '+kango.storage.getItem('do_manager_personal_access_token'), 'Content-Type': 'application/json'},
	        contentType: 'json'
		};

		kango.xhr.send(details, function(request) {
			if(request.status == 200 && request.response != null) 
			{
				var info = request.response;
					kango.console.log('Popup Get Droplets: API returned OK!');

					$.each(info.droplets, function(row, object)
					{
						var droplet_id = object.id;

						object.region_name = object.region.name;
						object.region_slug = object.region.slug;

						object.size_name = object.size.slug;
						object.size_slug = object.size.slug;
						object.size_mem = object.size.memory;
						object.size_cpu = object.size.vcpus;
						object.size_disk = object.size.disk;
						object.size_transfer = object.size.transfer;
						object.size_cost_per_hour = object.size.price_hourly;
						object.size_cost_per_month = object.size.price_monthly;

						estimated_total_cost_per_month = (estimated_total_cost_per_month + parseInt(object.size_cost_per_month));

						if (kango.storage.getItem('images_id_'+object.image_id+'_name'))
						{
							object.show_image_info = true;
							object.image_name = kango.storage.getItem('images_id_'+object.image_id+'_name');
							object.image_dist = kango.storage.getItem('images_id_'+object.image_id+'_distribution');
							object.image_slug = kango.storage.getItem('images_id_'+object.image_id+'_slug');
						}
						else
						{
							object.show_image_info = false;
						}

						kango.console.log(object);

						$('#do_droplets_ul').html($('#do_droplets_ul').html()+'<li id="do_ul_'+droplet_id+'"></li>');
						$('#do_droplets_info').html($('#do_droplets_info').html()+'<div class="tab-pane" id="do_id_'+droplet_id+'"></div>');

						var template = $.templates("#panel_template");
						var template2 = $.templates("#do_droplets_ul_template");

						template.link("#do_id_"+object.id, object);
						template2.link("#do_ul_"+object.id, object);
					});



					if (estimated_total_cost_per_month > 0)
					{
						$("#estimated_total_cost").html("$"+estimated_total_cost_per_month+" / mo");
						$("#estimated_alert").show();
					}

					$("#api_failed").hide();
					$("#api_failed_options_opened").hide();

					$('#do_droplets_ul a:first').tab('show');

				    prepareEventTracking();

				$.each(info.droplets, function(row, object)
					{
						$("#do_open_panel[data-do-object-id="+object.id+"]").click(function() {
							kango.browser.tabs.create({url:'https://cloud.digitalocean.com/droplets/'+object.id});
						});
						$("#do_reboot[data-do-object-id="+object.id+"]").click(function(){
							if (confirm("Are you sure you wish to Reboot this droplet?"))
							{
								var details = {
							        method: 'POST',
							        url: 'https://api.digitalocean.com/v2/droplets/'+object.id+'/actions',
							        async: true,
									params: {'type': 'reboot'},
									headers: {'Authorization': 'Bearer '+kango.storage.getItem('do_manager_personal_access_token'), 'Content-Type': 'application/json'},
									contentType: 'text'
								};

								kango.xhr.send(details, function(request) {
									if(request.status == 200 && request.response != null) 
									{
										alert('Successfully sent Reboot signal.  This panel may take a few minutes to reflect status.');
									}
								});
							}
						});
						$("#do_power_cycle[data-do-object-id="+object.id+"]").click(function(){
							if (confirm("Are you sure you wish to power CYCLE this droplet?"))
							{
								var details = {
									method: 'POST',
									url: 'https://api.digitalocean.com/v2/droplets/'+object.id+'/actions',
									async: true,
									params: {'type': 'power_cycle'},
									headers: {'Authorization': 'Bearer '+kango.storage.getItem('do_manager_personal_access_token'), 'Content-Type': 'application/json'},
									contentType: 'text'
								};

								kango.xhr.send(details, function(request) {
									if(request.status == 200 && request.response != null)
									{
										alert('Successfully sent power CYCLE signal.  This panel may take a few minutes to reflect status.');
									}
								});
							}
						});
						$("#do_shutdown[data-do-object-id="+object.id+"]").click(function(){
							if (confirm("Are you sure you wish to Shutdown this droplet?"))
							{
								var details = {
									method: 'POST',
									url: 'https://api.digitalocean.com/v2/droplets/'+object.id+'/actions',
									async: true,
									params: {'type': 'shutdown'},
									headers: {'Authorization': 'Bearer '+kango.storage.getItem('do_manager_personal_access_token'), 'Content-Type': 'application/json'},
									contentType: 'text'
								};

								kango.xhr.send(details, function(request) {
									if(request.status == 200 && request.response != null) 
									{
										alert('Successfully sent Shutdown signal.  This panel may take a few minutes to reflect status.');
									}
								});	
							}
						});
						$("#do_power_off[data-do-object-id="+object.id+"]").click(function(){
							if (confirm("Are you sure you wish to Power OFF this droplet?"))
							{
								var details = {
									method: 'POST',
									url: 'https://api.digitalocean.com/v2/droplets/'+object.id+'/actions',
									async: true,
									params: {'type': 'power_off'},
									headers: {'Authorization': 'Bearer '+kango.storage.getItem('do_manager_personal_access_token'), 'Content-Type': 'application/json'},
									contentType: 'text'
								};

								kango.xhr.send(details, function(request) {
									if(request.status == 200 && request.response != null)
									{
										alert('Successfully sent Power OFF signal.  This panel may take a few minutes to reflect status.');
									}
								});
							}
						});
						$("#do_power_on[data-do-object-id="+object.id+"]").click(function(){
							if (confirm("Are you sure you wish to Power ON this droplet?"))
							{
								var details = {
									method: 'POST',
									url: 'https://api.digitalocean.com/v2/droplets/'+object.id+'/actions',
									async: true,
									params: {'type': 'power_on'},
									headers: {'Authorization': 'Bearer '+kango.storage.getItem('do_manager_personal_access_token'), 'Content-Type': 'application/json'},
									contentType: 'text'
								};

								kango.xhr.send(details, function(request) {
									if(request.status == 200 && request.response != null) 
									{
										alert('Successfully sent Power ON signal.  This panel may take a few minutes to reflect status.');
									}
								});	
							}
						});
					});
			}
			else
			{
				$("#loading_bar").hide();
				$("#api_failed").show();
				$("#api_failed_options_opened").hide();
				kango.console.log('Popup Get Droplets: API key invalid.');
			}	
		});

		$("#loading_bar").hide();
		$("#edit_options").click(function(){
			kango.ui.optionsPage.open();
		});
	  $('body').tooltip({
	    selector: "a[data-toggle=tooltip]"
	  });
	}
});
