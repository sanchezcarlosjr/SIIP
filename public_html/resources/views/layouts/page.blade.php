<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    @include('includes.head')
	<link href="{{asset('css/app.css')}}" rel="stylesheet">
	<meta name="csrf-token" content="{{ csrf_token() }}">
    @yield('head')
</head>
<body>
	<div class="wrapper">
		<div class="main-header">
			@include('includes.header')
			@include('includes.navbar')
		</div>
		@include('layouts.sidebar')
		<div class="main-panel">
			<div class="content">
				<div class="page-inner">
					<div class="page-header">
						<h4 class="page-title"> @yield('page-title')</h4>
					</div>
					<div class="row">
							<div class="col-md-12">
								<div class="card">
										@hasSection('card-title')
											<div class="card-header" >
												<div class="card-title">@yield('card-title')</div>
											</div>
										@endif
                                    @yield('card')				
								</div>
							</div>
					</div>
				</div>
            </div>
              @include('layouts.footer')
		</div>
	</div>
  <script src="{{asset('js/app.js')}}"></script>
  @include('includes.script')
  @yield('scripts')
</body>
</html>