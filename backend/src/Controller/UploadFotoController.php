<?php
// src/Controller/UploadFotoController.php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class UploadFotoController extends AbstractController
{
    #[Route('/subir-foto/{id}', name: 'subir_foto', methods: ['POST'])]
    public function subirFoto(Request $request, int $id): Response
    {
        $foto = $request->files->get('fotoPerfil');

        if (!$foto) {
            return new JsonResponse(['error' => 'No se envió ninguna imagen'], 400);
        }

        // Define el nombre del archivo
        $nombreArchivo = 'usuario_' . $id . '.' . $foto->guessExtension();

        // Define el directorio
        $rutaDestino = $this->getParameter('kernel.project_dir') . '/public/uploads/fotos';

        // Crea el directorio si no existe
        if (!is_dir($rutaDestino)) {
            mkdir($rutaDestino, 0777, true);
        }

        // Mueve el archivo
        $foto->move($rutaDestino, $nombreArchivo);

        return new JsonResponse(['success' => true, 'archivo' => $nombreArchivo]);
    }
}
