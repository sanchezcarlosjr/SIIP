<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/archivo/public/{name}', function ($name = null) {
    return response()->file("../storage/app/public/${name}");
});

Route::get('/{any}', function () {
    return view('home');
})->where('any', '.*');
