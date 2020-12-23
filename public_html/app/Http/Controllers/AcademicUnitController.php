<?php

namespace App\Http\Controllers;

use App\Models\AcademicUnit;
use Illuminate\Http\Request;

class AcademicUnitController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return AcademicUnit::orderBy('created_at', 'asc')->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return AcademicUnit::create([
                'promep_key' => $request->promep_key,
                'academic_unit_name' =>  $request->academic_unit_name,
                'register_date' => $request->register_date,
                'active' => $request->active,
                'leader_id' => $request->leader_id,
                'uabc_area_id' => $request->uabc_area_id,
                'prodep_area_id' => $request->prodep_area_id,
                'displine_id' => $request->displine_id,
                'des_id' => $request->des_id
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\AcademicUnit  $academicUnit
     * @return \Illuminate\Http\Response
     */
    public function show(AcademicUnit $academicUnit)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\AcademicUnit  $academicUnit
     * @return \Illuminate\Http\Response
     */
    public function edit(AcademicUnit $academicUnit)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\AcademicUnit  $academicUnit
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, AcademicUnit $academicUnit)
    {
        return AcademicUnit::find($id)->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\AcademicUnit  $academicUnit
     * @return \Illuminate\Http\Response
     */
    public function destroy(AcademicUnit $academicUnit)
    {
        return $academicUnit->delete();
    }
}
