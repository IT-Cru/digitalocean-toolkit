function refresh_api_cache()
{
	//// Cache Regions first
	//var details = {
     //   method: 'GET',
     //   url: 'https://api.digitalocean.com/v2/regions',
     //   async: true,
	//	headers: {'Authorization': 'Bearer '+kango.storage.getItem('do_manager_personal_access_token'), 'Content-Type': 'application/json'},
     //   contentType: 'json'
	//};
    //
	//kango.xhr.send(details, function(request) {
	//	if(request.status == 200 && request.response != null)
	//	{
	//		var info = request.response;
	//		kango.console.log('Cache Regions: API returned OK!');
	//		$.each(info.regions, function(row, object)
	//		{
	//			kango.storage.setItem("regions_id_"+object.id+"_name", object.name);
	//			kango.storage.setItem("regions_id_"+object.id+"_slug", object.slug);
	//		});
	//	}
	//	else
	//	{
	//		kango.console.log('Cache regions: failed.');
	//	}
	//});
    //
	//// Cache Images
	//var details = {
     //   method: 'GET',
     //   url: 'https://api.digitalocean.com/v2/images',
     //   async: true,
	//	headers: {'Authorization': 'Bearer '+kango.storage.getItem('do_manager_personal_access_token'), 'Content-Type': 'application/json'},
     //   contentType: 'json'
	//};
    //
	//kango.xhr.send(details, function(request) {
	//	if(request.status == 200 && request.response != null)
	//	{
	//		var info = request.response;
	//		kango.console.log('Cache Images: API returned OK!');
	//		$.each(info.images, function(row, object)
	//		{
	//			kango.storage.setItem("images_id_"+object.id+"_name", object.name);
	//			kango.storage.setItem("images_id_"+object.id+"_distribution", object.name);
	//			kango.storage.setItem("images_id_"+object.id+"_slug", object.slug);
	//		});
	//	}
	//	else
	//	{
	//		kango.console.log('Cache images: failed.');
	//	}
	//});
    //
	//// Cache Sizes
	//var details = {
     //   method: 'GET',
     //   url: 'https://api.digitalocean.com/v2/sizes',
     //   async: true,
	//	headers: {'Authorization': 'Bearer '+kango.storage.getItem('do_manager_personal_access_token'), 'Content-Type': 'application/json'},
     //   contentType: 'json'
	//};
    //
	//kango.xhr.send(details, function(request) {
	//	if(request.status == 200 && request.response != null)
	//	{
	//		var info = request.response;
	//		kango.console.log('Cache Sizes: API returned OK!');
	//		$.each(info.sizes, function(row, object)
	//		{
	//			kango.storage.setItem("sizes_id_"+object.id+"_name", object.name);
	//			kango.storage.setItem("sizes_id_"+object.id+"_slug", object.slug);
	//			kango.storage.setItem("sizes_id_"+object.id+"_memory", object.memory);
	//			kango.storage.setItem("sizes_id_"+object.id+"_cpu", object.cpu);
	//			kango.storage.setItem("sizes_id_"+object.id+"_disk", object.disk);
	//			kango.storage.setItem("sizes_id_"+object.id+"_cost_per_hour", object.cost_per_hour);
	//			kango.storage.setItem("sizes_id_"+object.id+"_cost_per_month", object.cost_per_month);
	//		});
	//	}
	//	else
	//	{
	//		kango.console.log('Cache sizes: failed.');
	//	}
	//});
}

kango.addMessageListener('refresh_api_cache', function(event) {
	refresh_api_cache();
});
