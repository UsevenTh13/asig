<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('anggota_pelayanans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pelayanan_id')->constrained()->onDelete('cascade');
            $table->foreignId('jemaat_id')->constrained()->onDelete('cascade');
            $table->string('jabatan')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('anggota_pelayanans');
    }
};
