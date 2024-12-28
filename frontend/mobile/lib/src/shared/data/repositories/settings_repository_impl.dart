import 'package:dartz/dartz.dart';

import '../../../core/network/errors/failures.dart';
import '../../domain/repositories/abstract_settings_repository.dart';
import '../data_sources/local/abstract_settings_local_data_source.dart';

class SettingsRepositoryImpl implements AbstractSettingsRepository {
  final AbstractSettingsLocalDataSource localDataSource;

  SettingsRepositoryImpl(this.localDataSource);

  @override
  Future<Either<Failure, void>> changeLanguage(String languageCode) async {
    try {
      final result = await localDataSource.changeLanguage(languageCode);
      return Right(result);
    } catch (e) {
      return Left(CacheFailure(e.toString()));
    }
  }

  @override
  Future<Either<Failure, String>> fetchCurrentLanguage() async {
    try {
      final result = await localDataSource.fetchCurrentLanguageCode();
      return Right(result);
    } catch (e) {
      return Left(CacheFailure(e.toString()));
    }
  }
}
