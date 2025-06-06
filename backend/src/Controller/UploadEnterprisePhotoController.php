<?php
// src/Controller/UploadEnterprisePhotoController.php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class UploadEnterprisePhotoController extends AbstractController
{
    #[Route('/subir-foto-empresa/{id}', name: 'subir_foto_empresa', methods: ['POST'])]
    public function upload(int $id, Request $request): Response
    {
        $file = $request->files->get('fotoPerfil');

        if (!$file) {
            return new JsonResponse(['error' => 'No se envió ningún archivo'], Response::HTTP_BAD_REQUEST);
        }

        $uploadsDir = $this->getParameter('kernel.project_dir') . '/public/uploads/fotos';
        if (!is_dir($uploadsDir)) {
            mkdir($uploadsDir, 0777, true);
        }

        $fileName = "empresa_{$id}.jpg";
        $file->move($uploadsDir, $fileName);

        return new JsonResponse(['message' => 'Imagen subida correctamente']);
    }
}
