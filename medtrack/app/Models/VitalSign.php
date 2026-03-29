<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VitalSign extends Model
{
    protected $fillable = ['encounter_id','temperature','pulse','systolic','diastolic','respiration','saturation'];

    public function encounter() { return $this->belongsTo(Encounter::class); }
}
