author      'Daniel Mendler'
description 'PDF/PS information engine'
dependencies 'engine/engine'

Engine.create(:pdfpsinfo, :priority => 1, :layout => true, :cacheable => true) do
  def accepts?(page); page.mime == 'application/pdf' || page.mime.to_s =~ /postscript/; end
  def output(context)
    @resource = context.page
    page = context.params[:curpage].to_i
    @src = resource_path(@resource, :output => 'image', :geometry => '640x>', :curpage => page)
    output = context.params[:output] ? {:output => context.params[:output]} : {}
    @next = resource_path(@resource, {:curpage => page + 1}.merge(output))
    @prev = page > 0 && resource_path(@resource, {:curpage => page - 1}.merge(output))
    render :pdfpsinfo
  end
end
