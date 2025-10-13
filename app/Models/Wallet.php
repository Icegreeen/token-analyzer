<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Wallet extends Model
{
    protected $fillable = [
        'user_id',
        'address',
        'network',
        'label',
        'alerts_enabled',
        'last_checked_at',
        'tokens',
    ];

    protected $casts = [
        'alerts_enabled' => 'boolean',
        'last_checked_at' => 'datetime',
        'tokens' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function alerts(): HasMany
    {
        return $this->hasMany(Alert::class);
    }
}
