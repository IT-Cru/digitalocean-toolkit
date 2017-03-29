KangoAPI.onReady(function() {

	prepareEventTracking();

		if (kango.storage.getItem("do_manager_personal_access_token"))
		{
			$("#do_personal_access_token").val(kango.storage.getItem("do_manager_personal_access_token"));
		}

		$('#save_options').click(function(event)
		{
			var api_success = false;

			var details = {
		        method: 'GET',
		        url: 'https://api.digitalocean.com/v2/droplets',
		        async: false,
				headers: {'Authorization': 'Bearer '+$("#do_personal_access_token").val(), 'Content-Type': 'application/json'},
				contentType: 'json'
			};

			kango.xhr.send(details, function(request) {
				if(request.status == 200 && request.response != null)
				{
					api_success = true;
				}
				else
				{
					api_success = false;
				}
			});

			if (api_success)
			{
				kango.storage.setItem("do_manager_personal_access_token", $("#do_personal_access_token").val());
				kango.dispatchMessage('refresh_api_cache', true);
				$("#options_success").modal({
					backdrop: 'static',
				  keyboard: false
				});

				var details = {
					method: 'GET',
					url: 'https://api.digitalocean.com/v2/droplets',
					async: true,
					headers: {'Authorization': 'Bearer '+kango.storage.getItem('do_manager_personal_access_token'), 'Content-Type': 'application/json'},
					contentType: 'json'
				};

				kango.xhr.send(details, function(request) {
					if (request.status == 200 && request.response != null) {
						var info = request.response;
						kango.console.log('Popup Get Droplets: API returned OK!');

						$.each(info.droplets, function(row, object) {
							var droplet_id = object.id;
							console.log(object);
						});
					}
				});
			}
			else
			{
				$("#options_fail_api").modal({
					backdrop: 'static',
				  keyboard: false
				});
			}
		});		
});
