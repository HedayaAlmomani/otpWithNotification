<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'email',
        'email_verified_at',
        'remember_token',
        'full_name',
        'kyc_status',
        'kyc_document_type',
        'kyc_document_front',
        'kyc_document_back',
        'kyc_selfie_image',
        'kyc_reviewed_at',
        'kyc_reviewed_by',
        'referral_code',
        'referred_by',
        'role'
    ];


    protected $hidden = [
        'password',
        'remember_token',
        'kyc_document_front',
        'kyc_document_back',
        'kyc_selfie_image',
    ];


    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


}
